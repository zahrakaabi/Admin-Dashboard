/* -------------------------------------------------------------------------- */
/*                                DEPENDENCIES                                */
/* -------------------------------------------------------------------------- */
// Packages
import { fileData, fileThumb, fileFormat } from './utils';

/* -------------------------------------------------------------------------- */
/*                          FILE THUMBNAIL COMPONENT                          */
/* -------------------------------------------------------------------------- */
type FileIconProps = {
  file: File | string;
  tooltip?: boolean;
  fileView?: boolean;
  onDownload?: VoidFunction;
};

function FileThumbnail({ file, tooltip, fileView, onDownload }: FileIconProps) {
/* --------------------------------- CONSTS --------------------------------- */
  const { name = '', path = '', preview = '' } = fileData(file) || {};

  const format = fileFormat(path || preview);

  const fileSrc = preview || path;

  const renderContent =
    format === 'image' && fileView  ? (
      <img
        src={fileSrc}
        className="w-full h-full shrink-0 object-cover"
        alt={name}
      />
    ) : format === 'pdf' && fileView ? (
      <img
        src={fileThumb('pdf')}
        className="w-full h-full shrink-0 object-cover"
        alt={name}
      />
    ) : (
      <img
        src={fileThumb(format)}
        className="w-8 h-8 shrink-0 object-cover"
        alt={name}
      />
    );

  if (tooltip) {
    return (
        <><h1>{renderContent}</h1>
    {/* //   <Tooltip title={name}>
    //     <Stack
    //       flexShrink={0}
    //       component="span"
    //       alignItems="center"
    //       justifyContent="center"
    //       sx={{
    //         width: 'fit-content',
    //         height: 'inherit',
    //       }}
    //     >
    //       {renderContent}
    //       {onDownload && <DownloadButton onDownload={onDownload} />}
    //     </Stack>
    //   </Tooltip> */}
    </>
    );
  }

  return (
    <>
      {renderContent}
      {/* {onDownload && <DownloadButton onDownload={onDownload} />} */}
    </>
  );
};

export default FileThumbnail;