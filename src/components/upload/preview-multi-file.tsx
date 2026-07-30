/* -------------------------------------------------------------------------- */
/*                                DEPENDENCIES                                */
/* -------------------------------------------------------------------------- */
// UI Local Components
import { fileData, FileThumbnail } from '../file-thumbnails';

// Utils
import type { UploadProps } from './types';

/* -------------------------------------------------------------------------- */
/*                        PREVIEW MULTI FILE COMPONENT                        */
/* -------------------------------------------------------------------------- */
function MultiFilePreview({ thumbnail, files, onRemove }: UploadProps) {
/* -------------------------------- RENDERING ------------------------------- */
  return (
    <div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
        {files?.map((file) => {
          const { key, name = '', size = 0 } = fileData(file);

          if (thumbnail) {
            return (
              <div>
                <FileThumbnail
                  tooltip
                  fileView
                  file={file}
                  // sx={{ position: 'absolute' }}
                  // fileSx={{ position: 'absolute' }}
                />
              </div>
            )
          }

          return (
            <div
              key={key}
              // {...varFade().inUp}
              className="flex flex-row items-center gap-4 my-2 py-2 px-3 rounded border border-gray-500/15"
            >
              <FileThumbnail file={file} />
              hg
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default MultiFilePreview;