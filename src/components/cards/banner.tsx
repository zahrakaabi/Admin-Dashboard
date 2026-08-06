/* -------------------------------------------------------------------------- */
/*                                DEPENDENCIES                                */
/* -------------------------------------------------------------------------- */
// UI Lib Components
import { Button, Card } from "../ui";

/* -------------------------------------------------------------------------- */
/*                              BANNER COMPONENT                              */
/* -------------------------------------------------------------------------- */
type BannerProps = {
    title: string;
    description: string;
    btnLabel: string;
    image: React.ReactNode;
};

function Banner({ title, description, btnLabel, image }: BannerProps) {
/* -------------------------------- RENDERING ------------------------------- */
  return (
    <Card className="flex flex-row items-end justify-center min-h-[15rem] gap-2 p-8 border border-slate-800 bg-[linear-gradient(to_right,#0f172a_25%,rgba(49,46,129,0.88)),url('/assets/background/background-6.webp')] bg-no-repeat),url('/assets/background/background-6.webp')] bg-cover bg-center bg-no-repeat rounded-lg shadow-lg text-white">
        <div className="max-w-[25ch]">
            <h4 className="mb-2 whitespace-pre-line text-xl font-bold font-sans">{title}</h4>
            <p className="mb-4 max-w-[360px] text-sm leading-[1.57143] font-normal opacity-65 font-sans">
                {description}
            </p>
            <Button variant="outline" className="inline-flex min-h-9 min-w-16 cursor-pointer select-none items-center justify-center rounded-md border-0 bg-blue-600 px-3 py-1.5 text-sm font-bold leading-[1.71429] text-white no-underline shadow-none outline-none transition-colors duration-200 hover:bg-blue-700 active:bg-blue-800 disabled:pointer-events-none disabled:opacity-50"
            >
                {btnLabel}
            </Button>
        </div>

        <div className="w-[13rem]">{image}</div>
    </Card>
  )
};

export default Banner;