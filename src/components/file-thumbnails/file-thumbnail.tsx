/* -------------------------------------------------------------------------- */
/*                                DEPENDENCIES                                */
/* -------------------------------------------------------------------------- */
// UI Lib Components
import { Tooltip, TooltipContent, TooltipTrigger } from '../ui';

// UI Local Components
import DownloadButton from './download-button';

// Utils
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
        className="w-20 h-20 shrink-0 object-cover"
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
      <Tooltip>
        <TooltipTrigger>
          <span className="flex justify-center items-center shrink-0 w-fit h-[inherit]">
            {renderContent}
          </span>
          {onDownload && <DownloadButton onDownload={onDownload} />}
        </TooltipTrigger>
        <TooltipContent>
          <p>{name}</p>
        </TooltipContent>
      </Tooltip>
    );
  }

/* -------------------------------- RENDERING ------------------------------- */
  return (
    <>
      {renderContent}
      {onDownload && <DownloadButton onDownload={onDownload} />}
    </>
  );
};

export default FileThumbnail;