/* -------------------------------------------------------------------------- */
/*                                DEPENDENCIES                                */
/* -------------------------------------------------------------------------- */
// Packages
import type { CustomFile, PreviewMultiFileProps } from './types';

/* -------------------------------------------------------------------------- */
/*                        PREVIEW MULTI FILE COMPONENT                        */
/* -------------------------------------------------------------------------- */
function MultiFilePreview({ thumbnail, files, onRemove }: PreviewMultiFileProps) {
/* -------------------------------- RENDERING ------------------------------- */
  return (
    <div style={{ marginTop: '16px', width: '100%' }}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
        {files?.map((file, index) => {
          // const { key, name = '', size = 0 } = fileData(file);
          const isNotFormatFile = typeof file === 'string';
          const src = isNotFormatFile ? file : undefined;

          console.log('testtttt', files)

          return (
            <div key={index}>
              {src ? <img src={src} alt="img" /> : null}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default MultiFilePreview;