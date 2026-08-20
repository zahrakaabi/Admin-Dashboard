/* -------------------------------------------------------------------------- */
/*                                DEPENDENCIES                                */
/* -------------------------------------------------------------------------- */
// Packages
import { motion, AnimatePresence } from 'framer-motion';

// UI Lib Components
import { X as CloseIcon } from "lucide-react";
import { Button } from '../ui';

// UI Local Components
import { fileData, FileThumbnail } from '../file-thumbnails';

// Utils
import type { UploadProps } from './types';
import { varFade } from '../animate';

/* -------------------------------------------------------------------------- */
/*                        PREVIEW MULTI FILE COMPONENT                        */
/* -------------------------------------------------------------------------- */
function MultiFilePreview({ thumbnail, files, onRemove }: UploadProps) {
/* -------------------------------- RENDERING ------------------------------- */
  return (
    <AnimatePresence initial={false}>
      {files?.map((file) => {
        const { key } = fileData(file);

        if (thumbnail) {
          return (
            <motion.div
              key={key}
              variants={varFade().inUp}
              initial="initial"
              animate="animate"
              exit="exit"
              className="inline-flex items-center justify-center m-0.5 w-20 h-20 rounded-[10px] overflow-hidden relative border border-gray-300/20"
            >
              <FileThumbnail
                tooltip
                fileView
                file={file}
              />

              {onRemove && (
                <Button
                  size="icon"
                  variant="ghost"
                  onClick={() => onRemove(file)}
                  className="cusrsor-pointer absolute top-1 right-1 h-6 w-6 rounded-full bg-neutral-900/50 p-1 text-white hover:bg-neutral-900/70 hover:text-white"
                >
                  <CloseIcon className="h-3.5 w-3.5" />
                  <span className="sr-only">Remove</span>
                </Button>
              )}
            </motion.div>
          )
        }

        return (
          <motion.div
            key={key}
            variants={varFade().inUp}
            initial="initial"
            animate="animate"
            exit="exit"
            className="flex flex-row items-center gap-4 my-2 py-2 px-3 rounded border border-gray-500/15"
          >
            <FileThumbnail file={file} />
          </motion.div>
        );
      })}
    </AnimatePresence>
  );
};

export default MultiFilePreview;