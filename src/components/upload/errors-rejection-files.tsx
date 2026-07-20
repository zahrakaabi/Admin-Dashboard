/* -------------------------------------------------------------------------- */
/*                                DEPENDENCIES                                */
/* -------------------------------------------------------------------------- */
// Packages
import type { FileRejection } from 'react-dropzone';

/* -------------------------------------------------------------------------- */
/*                      ERROR REJECTIONS FILES COMPONENT                      */
/* -------------------------------------------------------------------------- */
function ErrorRejectionsFiles({ fileRejections }: { fileRejections: FileRejection[] }) {
  if (fileRejections.length === 0) return null;

/* -------------------------------- RENDERING ------------------------------- */
  return (
    <div style={{ 
        marginTop: '12px', 
        padding: '12px 16px', 
        borderRadius: '8px', 
        backgroundColor: 'rgba(255, 86, 48, 0.08)', 
        border: '1px solid rgba(255, 86, 48, 0.2)', 
        display: 'flex', 
        flexDirection: 'column', gap: '6px' 
    }}>
      {fileRejections.map(({ file, errors }) => (
        <div key={file.name}>
          <span style={{ fontSize: '0.875rem', fontWeight: 600, color: '#FF5630', display: 'block' }}>
            {file.name} - {(file.size / (1024 * 1024)).toFixed(2)} MB
          </span>
          {errors.map((error) => <span 
            key={error.code} 
            style={{ fontSize: '0.75rem', color: '#B71D18', display: 'block', marginLeft: '8px' }}
          >
            • {error.message}
          </span>)}
        </div>
      ))}
    </div>
  );
};

export default ErrorRejectionsFiles;