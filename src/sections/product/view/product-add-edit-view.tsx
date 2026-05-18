/* -------------------------------------------------------------------------- */
/*                                DEPENDENCIES                                */
/* -------------------------------------------------------------------------- */
// Packages
import * as Yup from 'yup';
import { useMemo } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useSnackbar } from 'notistack';

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
  PRODUCT_COLORS, 
  CATEGORIES 
} from "@/_mock";
import { useBoolean } from '@/hooks';

/* -------------------------------------------------------------------------- */
/*                              PRODUCT ADD VIEW                              */
/* -------------------------------------------------------------------------- */
function ProductAddEditView() {
/* ------------------------------ CUSTOM HOOKS ------------------------------ */
  const loadingSend = useBoolean(false);
  const { enqueueSnackbar } = useSnackbar();

/* ---------------------------- VALIDATION SCHEMA --------------------------- */
  const NewCurrentProductSchema = Yup.object().shape({
    title: Yup.string().required('Product Name is required'),
    description: Yup.string().required('Description is required'),
    code: Yup.string().required('Product code is required'),
    categoryId: Yup.string().required('Category is required'),
    stock: Yup.number().min(0).required('Stock is required'),
    maxStock: Yup.number().min(0).optional().default(undefined),
    quantity: Yup.number().min(0).required('Quantity is required'),      

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
    }),

    images: Yup.array().of(
      Yup.mixed<File | string>()
        .test("fileType", "Only JPG, PNG allowed", (value) => {
          if (typeof value === "string") return true;
          if (!value) return false;
          return [
            "image/jpeg",
            "image/jpg",
            "image/png"
          ].includes((value as File).type);
        })
        .test("fileSize", "File must be less than 5MB", (value) => {
          if (typeof value === "string") return true
          if (!value) return false;
          return (value as File).size <= 5 * 1024 * 1024;
        })
      )
      .min(1, "Images are required")
      .required("Images are required"),
    colors: Yup.array().of(Yup.string().required()).min(1, 'Choose at least one color').default([]),
    sizes: Yup.array().of(Yup.mixed<string | number>().required()).min(1, 'Choose at least one size').default([]),
    gender: Yup.string()
      .oneOf(['men', 'women', 'unisex', 'kids', ''], 'Gender is required')
      .test('gender-selected', 'Gender is required', (value) => value !== '')
      .required('Gender is required')
  });

/* -------------------------------- CONSTANTS ------------------------------- */
  const defaultValues = useMemo(
    () => ({
      title: '', // currentProduct?.Name || "",
      description: '',
      code: '',
      categoryId: '',
      stock: 0,
      maxStock: undefined,
      quantity: 0,
      prices: {
        regular: 0,
        sale: 0,
      },
      images: [],
      colors: [],
      sizes: [],
      gender: '' as 'men' | 'women' | 'unisex' | 'kids',
    }), 
    []//[currentProduct]
  );

  const methods = useForm({
    resolver: yupResolver(NewCurrentProductSchema),
    defaultValues
  });

  const {
    reset,
    //control,
    handleSubmit,
    //formState: { isSubmitting }
  } = methods;

/* ----------------------------- HANDLER FUNCTIONS -------------------------- */
  const handleEditAndSend = handleSubmit(async (data) => {
    try {
      loadingSend.onTrue();
      console.log('data', data);
      enqueueSnackbar('Update with success!');
      reset();
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
                  name="categoryId"
                  label="Category"
                  placeholder="Select a category"
                  children={CATEGORIES.map((category) => <SelectGroup key={category.id}>
                    <SelectLabel>{category.title}</SelectLabel>
                      {category.children?.map((child) => (
                        <SelectItem key={child.id} value={child.id}>
                          {child.title}
                        </SelectItem>
                      ))}
                    </SelectGroup>)}>
                  </RHFSelect>
                </div>
                <div className="flex gap-4 sm:flex-row flex-col sm:items-start">
                  {/* colors */}
                  <RHFMultiSelect
                    options={PRODUCT_COLORS}
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
                  options={['men', 'women', 'unisex', 'kids']}
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
          <button type="submit" className="px-6 py-3 bg-gray-800 self-end rounded-lg text-white hover:bg-gray-900 transition font-medium text-sm font-sans">
            Create Product
          </button>
        </div>
      </FormProvider>
    </div>
  )
};

export default ProductAddEditView;