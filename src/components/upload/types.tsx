/* -------------------------------------------------------------------------- */
/*                                DEPENDENCIES                                */
/* -------------------------------------------------------------------------- */
// Package
import type { DropzoneOptions, Accept } from 'react-dropzone';

/* -------------------------------------------------------------------------- */
/*                            CUSTOM FILE INTERFACE                           */
/* -------------------------------------------------------------------------- */
export interface CustomFile extends File {
  path?: string;
  preview?: string;
  lastModifiedDate?: string;
}

/* -------------------------------------------------------------------------- */
/*                     PREVIEW MULTI FILE PROPS INTERFACE                     */
/* -------------------------------------------------------------------------- */
export interface PreviewMultiFileProps {
  files: (CustomFile | string)[];
  onRemove?: (file: CustomFile | string) => void;
  onRemoveAll?: () => void;
  onUpload?: () => void;
}

/* -------------------------------------------------------------------------- */
/*                           UPLOAD PROPS INTERFACE                           */
/* -------------------------------------------------------------------------- */
export interface UploadProps extends DropzoneOptions {
  accept?: Accept; // Ensure this matches the `Accept` type from `react-dropzone`
  error?: boolean;
  thumbnail?: boolean;
  placeholder?: React.ReactNode;
  helperText?: React.ReactNode;
  disableMultiple?: boolean;
  //
  file?: CustomFile | string | null;
  onDelete?: (file: CustomFile | string) => void;
  //
  files?: (CustomFile | string)[];
  onUpload?: VoidFunction;
  onRemove?: (file: CustomFile | string) => void;
  onRemoveAll?: () => void;
};