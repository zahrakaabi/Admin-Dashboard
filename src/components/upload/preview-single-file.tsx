/* -------------------------------------------------------------------------- */
/*                                DEPENDENCIES                                */
/* -------------------------------------------------------------------------- */
// UI Local Components
import Image from "../image";

/* -------------------------------------------------------------------------- */
/*                        PREVIEW SINGLE FILE COMPONENT                       */
/* -------------------------------------------------------------------------- */
type Props = {
  imgUrl?: string
};

function SingleFilePreview({ imgUrl = '' }: Props) {
/* -------------------------------- RENDRING -------------------------------- */
  return (
    <div className="absolute inset-0 p-4">
      <Image
        alt="file preview"
        src={imgUrl}
        className="w-full h-full rounded"
      />
    </div>
  );                           
};

export default SingleFilePreview;