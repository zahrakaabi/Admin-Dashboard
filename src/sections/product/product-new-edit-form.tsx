/* -------------------------------------------------------------------------- */
/*                                DEPENDENCIES                                */
/* -------------------------------------------------------------------------- */
// Packages
import * as Yup from 'yup';
import { useMemo, useCallback } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useSnackbar } from 'notistack';
import { useNavigate } from "react-router";

// UI Lib Components
import { SelectGroup, SelectItem, SelectLabel } from "@/components/ui";

// UI Local Components
import CustomCard from "@/components/custom-card";
import { 
  FormProvider,
  RHFMultiCheckbox,
  RHFMultiSelect,
  RHFSelect, 
  RHFTextArea, 
  RHFTextField, 
  RHFUpload 
} from "@/components/hook-form";

// Utils
import { 
  CLOTHING_SIZES, 
  PRODUCT_CATEGORY_OPTIONS, 
  PRODUCT_COLOR_OPTIONS 
} from '@/_mock';
import type { PRODUCT } from '@/types';
import { useBoolean } from '@/hooks';
import { useProducts } from './context/use-products';
import { paths } from '@/routes/paths';

/* -------------------------------------------------------------------------- */
/*                              PRODUCT ADD VIEW                              */
/* -------------------------------------------------------------------------- */
type ProductNewEditFormProps = {
  currentProduct?: PRODUCT
};

function ProductNewEditForm({ currentProduct }: ProductNewEditFormProps) {
/* ------------------------------ CUSTOM HOOKS ------------------------------ */
  const loadingSend = useBoolean(false);
  const { addProduct } = useProducts();
  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();

/* ---------------------------- VALIDATION SCHEMA --------------------------- */
  const NewCurrentProductSchema = Yup.object().shape({
    title: Yup.string().required('Product Name is required'),
    description: Yup.string().required('Description is required'),
    code: Yup.string().required('Product code is required'),
    category: Yup.string().required('Category is required'),
    stock: Yup.number().typeError('Stock must be a number').min(0).required('Stock is required'),
    quantity: Yup.number().typeError('Quantity must be a number').min(0).required('Quantity is required'),
    
    prices: Yup.object({
      regular: Yup.number().min(0).required('Regular price is required'),
      sale: Yup.number()
        .min(0)
        .test('sale-less-than-regular', 'Sale must be less than Regular', function (value) {
          const { regular } = this.parent;
          if (value === undefined || regular === undefined) return true;
          return value <= regular;
        })
        .required('Sale price is required'),
      cost: Yup.number().min(0).required('Cost price is required')
    }),

    images: Yup.array()
      .of(Yup.mixed<string | File>()
        .test("fileType", "Only JPG, PNG allowed", (value) => {
          if (typeof value === "string" || value === undefined) return true;
          if (!value) return false;
          return [
            "image/jpeg",
            "image/jpg",
            "image/png"
          ].includes((value as File).type);
        })
        .test("fileSize", "File must be less than 5MB", (value) => {
          if (typeof value === "string" || value === undefined) return true
          if (!value) return false;
          return (value as File).size <= 5 * 1024 * 1024;
        })
      )
      .min(1, "Images are required")
      .required("Images are required"),
    colors: Yup.array().of(Yup.string().required()).min(1, 'Choose at least one color').default([]),
    sizes: Yup.array().of(Yup.mixed<string | number>().required()).min(1, 'Choose at least one size').default([]),
    gender: Yup.string()
      .oneOf(['men', 'woman', 'unisex', 'kids'], 'Invalid gender')
      .required('Gender is required')
  });

/* -------------------------------- CONSTANTS ------------------------------- */
  const defaultValues = useMemo(
    () => ({
      title: currentProduct?.title || '',
      description: currentProduct?.description || '',
      code: currentProduct?.code || '',
      category: currentProduct?.category || '',
      stock: currentProduct?.stock || 0,
      quantity: currentProduct?.quantity || 0,
      prices: {
        regular: currentProduct?.prices?.regular || 0,
        sale: currentProduct?.prices?.sale || 0,
        cost: currentProduct?.prices?.cost || 0
      },
      images: (currentProduct?.images || []) as (string | File)[],
      colors: currentProduct?.colors || [],
      sizes: currentProduct?.sizes || [],
      gender: (currentProduct?.gender || '') as 'men' | 'woman' | 'unisex' | 'kids'
    }), 
    [currentProduct]
  );

  const methods = useForm({ 
    resolver: yupResolver(NewCurrentProductSchema),
    defaultValues
  });

  const {
    reset,
    watch,
    //control,
    handleSubmit,
    //formState: { isSubmitting },
    setValue
  } = methods;

/* ----------------------------- HANDLER FUNCTIONS -------------------------- */
  const values = watch();

  const handleDrop = useCallback(
    (acceptedFiles: File[]) => {
      const files = values.images || [];
      const newFiles = acceptedFiles.map((file) =>
        Object.assign(file, {
          preview: URL.createObjectURL(file),
        })
      );
      setValue('images', [...files, ...newFiles], { shouldValidate: true });
    },
    [setValue, values.images]
  );

  const handleEditAndSend = handleSubmit(async (data) => {
    try {
      loadingSend.onTrue();

      const getInventoryStatus = (stock: number): 'out of stock' | 'low stock' | 'in stock' => {
        if (stock === 0) return 'out of stock';
        if (stock < 10) return 'low stock';
        return 'in stock';
      };

      const productPayload = {
        ...data,
        id: currentProduct ? currentProduct.id : `prod-${Date.now()}`,
        slug: data.title
          .toLowerCase()
          .replace(/[^a-z0-9]+/g, '-')
          .replace(/(^-|-$)+/g, ''),
        sku: currentProduct ? currentProduct.sku : `SKU-${data.code}-${Math.floor(Math.random() * 1000)}`,
        parentCategory: data.category === 'Clothing' ? 'Clothing' : 'Accessories',
        status: currentProduct ? currentProduct.status : 'new',
        inventoryType: getInventoryStatus(data.stock),
        creationAt: currentProduct ? currentProduct.creationAt : new Date(),
        images: data.images.filter((img) => img !== undefined) as (string | File)[],
        maxStock: 200,
      };

      // if (currentProduct) {
      //   updateProduct(productPayload);
      //   enqueueSnackbar('Update with success!');
      // } else {
      //   addProduct(productPayload);
      //   enqueueSnackbar('Created with success!');
      // }
      addProduct(productPayload);
      enqueueSnackbar('Update with success!');

      reset();
      navigate(paths.dashboard.product.list);
    } catch (error) {
      console.error(error);
      enqueueSnackbar("Something went wrong. Please try again.", { variant: "error" });
    } finally {
      loadingSend.onFalse();
    };
  });

/* -------------------------------- RENDERING ------------------------------- */
  return (
    <div className="mx-auto max-w-xl ">
      <FormProvider methods={methods} onSubmit={handleEditAndSend}>
        <div className="flex flex-col items-end gap-6">
          {/* ----------------------- PRODUCT INFOS ---------------------------- */}
          <CustomCard
            cardTitle="Details"
            cardDescription="Title, short description, image..."
            content= {
              <>
                <RHFTextField
                  type="text"
                  label="Name"
                  name="title"
                  placeholder="Product title"
                />
                <RHFTextArea
                  label="Description"
                  name="description"
                  placeholder="Type product description here..."
                />
                <RHFUpload
                  name="images"
                  multiple
                  thumbnail
                  // maxSize={3145728}
                  onDrop={handleDrop}
                  // onRemove={handleRemoveFile}
                  // onRemoveAll={handleRemoveAllFiles}
                  // onUpload={() => console.info('ON UPLOAD')}
                />
              </>
            }
          />

          {/* --------------------------- PRODUCT PROPERTIES --------------------------- */}
          <CustomCard
            cardTitle="Properties"
            cardDescription="Additional functions and attributes..."
            content= {
              <>
                <RHFTextField
                  type="text"
                  label="Product Code"
                  name="code"
                  placeholder="Product Code"
                />
                <div className="flex gap-4 sm:flex-row sm:items-start flex-col">
                  <RHFTextField
                    type="number"
                    label="Quantity"
                    name="quantity"
                    placeholder="0"
                  />
                  {/* category (select) */}
                  <RHFSelect 
                    name="category"
                    label="Category"
                    placeholder="Select a category"
                    children={PRODUCT_CATEGORY_OPTIONS.map(({ parent, children }) => (
                      <SelectGroup key={parent}>
                        <SelectLabel>{parent}</SelectLabel>
                          {children.map((child) => (
                            <SelectItem key={child} value={child}>
                              {child}
                            </SelectItem>
                          ))}
                      </SelectGroup>
                    ))}
                  />
                </div>
                <div className="flex gap-4 sm:flex-row flex-col sm:items-start">
                  {/* colors */}
                  <RHFMultiSelect
                    options={PRODUCT_COLOR_OPTIONS}
                    placeholder="Colors"
                    label='Colors'
                    name='colors'
                  />
                  {/* sizes */}
                  <RHFMultiSelect
                    options={CLOTHING_SIZES}
                    placeholder="Sizes"
                    label='Sizes'
                    name='sizes'
                  />
                </div>
                {/* gender */}
                <RHFMultiCheckbox
                  name='gender'
                  label='Gender'
                  options={['men', 'woman', 'unisex', 'kids']}
                />
              </>
            }
          />

          {/* ----------------------------- PRODUCT PRICING ---------------------------- */}
          <CustomCard
            cardTitle="Pricing"
            cardDescription="Price related inputs"
            content= {
              <>
                <RHFTextField
                  type="number"
                  label="Regular Price"
                  name="prices.regular"
                  placeholder="Regular Price"
                />
                <RHFTextField
                  type="number"
                  label="Sale Price"
                  name="prices.sale"
                  placeholder="Sale Price"
                />
              </>
            }
          />

          {/* SUBMIT BUTTON */}
          <button type="submit" className="px-6 py-3 bg-blue-500 self-end rounded-lg text-white hover:bg-gray-900 transition font-medium text-sm font-sans">
            {currentProduct ? 'Save changes' : 'Create'}
          </button>
        </div>
      </FormProvider>
    </div>
  )
};

export default ProductNewEditForm;