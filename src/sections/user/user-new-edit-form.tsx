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
import { Card, CardContent } from "@/components/ui";

// UI Local Components
import { 
  FormProvider,
  RHFTextField,
  RHFUploadAvatar
} from "@/components/hook-form";

// Utils
import type { USER } from '@/types';
import { useBoolean } from '@/hooks';
import { useUser } from './context/use-user';
import { paths } from '@/routes/paths';
import { fData } from '@/utils';

/* -------------------------------------------------------------------------- */
/*                              USER ADD VIEW                                 */
/* -------------------------------------------------------------------------- */
type UserNewEditFormProps = {
  currentUser?: USER
};

function UserNewEditForm({ currentUser }: UserNewEditFormProps) {
/* ------------------------------ CUSTOM HOOKS ------------------------------ */
  const loadingSend = useBoolean(false);
  const { addUser, updateUser } = useUser();
  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();

/* ---------------------------- VALIDATION SCHEMA --------------------------- */
  const NewCurrentUserSchema = Yup.object().shape({
    photoURL: Yup.string().required('User photo is required'),
    fullName: Yup.string().required('User Full Name is required'),
    email: Yup.string().required('User email is required'),
    city: Yup.string().required('User city is required'),
    adress: Yup.string(),
    zip: Yup.number().nullable().required('Zip code is required'),
    role: Yup.string().required('User role is required')
  });

/* -------------------------------- CONSTANTS ------------------------------- */
  const defaultValues = useMemo(
    () => ({
      photoURL: currentUser?.photoURL || '',
      fullName: currentUser?.fullName || '',
      email: currentUser?.email || '',
      city: currentUser?.city || '',
      adress: currentUser?.adress || '',
      zip: currentUser?.zip || 0,
      role: currentUser?.role || ''
    }), 
    [currentUser]
  );

  const methods = useForm({ 
    resolver: yupResolver(NewCurrentUserSchema),
    defaultValues
  });

  const {
    reset,
    //control,
    handleSubmit,
    //formState: { isSubmitting },
    setValue
  } = methods;

/* ----------------------------- HANDLER FUNCTIONS -------------------------- */
  const handleDrop = useCallback(
    (acceptedFiles: File[]) => {
      const file = acceptedFiles[0];

      const newFile = Object.assign(file, {
        preview: URL.createObjectURL(file),
      });

      if (file) {
        setValue('photoURL', newFile.preview, { shouldValidate: true });
      }
    },
    [setValue]
  );

  const handleEditAndSend = handleSubmit(async (data) => {
    try {
      loadingSend.onTrue();

      if (currentUser) {
        updateUser({ ...currentUser, ...data });
        enqueueSnackbar('User updated successfully');
      } else {
        addUser({
          id: `user-${Date.now()}`,
          phoneNumber: '+216 22 222 222',
          company: 'Company Name',
          status: 'Pending',
          ...data,
        });
        enqueueSnackbar('User created successfully');
      }
      
      reset();
      navigate(paths.dashboard.user.list);
    } catch (error) {
      console.error(error);
      enqueueSnackbar("Something went wrong. Please try again.", { variant: "error" });
    } finally {
      loadingSend.onFalse();
    };
  });

/* -------------------------------- RENDERING ------------------------------- */
  return (
    <div className="mx-auto max-w-4xl">
      <FormProvider methods={methods} onSubmit={handleEditAndSend}>
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
          {/* Left column — avatar + status */}
          <div className="md:col-span-4">
            <Card className="h-full pt-10 pb-5 px-6 text-center">
              <CardContent className="flex flex-col items-center gap-6 pt-8 pb-10">
                {/* upload avatar & apply disable account */}
                <RHFUploadAvatar
                  name="photoURL"
                  maxSize={3145728}
                  onDrop={handleDrop}
                  helperText={
                    <p className="mt-6 mx-auto block text-center text-xs text-muted-foreground">
                      Allowed *.jpeg, *.jpg, *.png, *.gif
                      <br /> max size of {fData(3145728)}
                    </p>
                  }
                />
              </CardContent>
            </Card>
          </div>

          {/* Right column — details */}
          <div className="md:col-span-8">
            <Card className="h-full">
              <CardContent className="pt-8">
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <RHFTextField
                      type="text"
                      label="Full name"
                      name="fullName"
                      placeholder="Full name"
                      autoFocus
                    />

                    <RHFTextField
                      type="email"
                      label="E-mail"
                      name="email"
                      placeholder="E-mail"
                    />

                    <RHFTextField
                      type="text"
                      label="City"
                      name="city"
                      placeholder="City"
                    />

                    <RHFTextField
                      type="text"
                      label="Adress"
                      name="adress"
                      placeholder="Adress"
                    />

                    <RHFTextField
                      type="text"
                      label="Zip/code"
                      name="zip"
                      placeholder="Zip/code"
                    />

                    <RHFTextField
                      type="text"
                      label="Role"
                      name="role"
                      placeholder="Role"
                    />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* SUBMIT BUTTON */}
          <div className="md:col-span-12 flex justify-end">
            <button type="submit" className="px-6 py-3 bg-black self-end rounded-lg text-white hover:bg-gray-900 transition font-medium text-sm font-sans whitespace-nowrap w-fit shrink-0 cursor-pointer"
            aria-label={currentUser ? 'Save changes' : 'Create'}
            title={currentUser ? 'Save changes' : 'Create'}>
              {currentUser ? 'Save changes' : 'Create'}
            </button>
          </div>
        </div>
      </FormProvider>
    </div>
  )
};

export default UserNewEditForm;