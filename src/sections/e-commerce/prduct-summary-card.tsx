/* -------------------------------------------------------------------------- */
/*                                DEPENDENCIES                                */
/* -------------------------------------------------------------------------- */
// UI Local Components
import { SparklineChart } from "@/components/charts";

// Utils
import { PRODUCT_SUMMARY } from "@/_mock/e-commerce/_summary";

/* -------------------------------------------------------------------------- */
/*                       PRODUCT SUMMARY CARD COMPONENT                       */
/* -------------------------------------------------------------------------- */
function ProductSummaryCard({ summary }: { summary: typeof PRODUCT_SUMMARY[0] }) {
  const { title, total, percent, trend, chart, chartColor } = summary;

/* -------------------------------- RENDERING ------------------------------- */
  return (
    <div className="flex items-center gap-12 p-4 rounded-lg bg-white shadow-lg">
        <div>
            <h3 className="font-sans font-semibold text-sm leading-normal">{title}</h3>
            <p className="my-4 font-bold text-2xl leading-normal">{total}</p>
            <div className="flex gap-2">
                <span className={`${trend === "up" ? 'bg-green-100': 'bg-red-100'} w-6 h-6 flex rounded-full relative items-center justify-center`}>
                    {trend === "up" ? (
                        <svg aria-hidden="true" role="img" className="h-4 w-4 text-emerald-500" viewBox="0 0 24 24">
                            <path fill="currentColor" d="M21 7a.8.8 0 0 0 0-.21a.6.6 0 0 0-.05-.17a1 1 0 0 0-.09-.14a.8.8 0 0 0-.14-.17l-.12-.07a.7.7 0 0 0-.19-.1h-.2A.7.7 0 0 0 20 6h-5a1 1 0 0 0 0 2h2.83l-4 4.71l-4.32-2.57a1 1 0 0 0-1.28.22l-5 6a1 1 0 0 0 .13 1.41A1 1 0 0 0 4 18a1 1 0 0 0 .77-.36l4.45-5.34l4.27 2.56a1 1 0 0 0 1.27-.21L19 9.7V12a1 1 0 0 0 2 0z" />
                        </svg>
                    ) : (
                        <svg aria-hidden="true" role="img" className="h-4 w-4 text-rose-500" viewBox="0 0 24 24">
                            <path fill="currentColor" d="M21 12a1 1 0 0 0-2 0v2.3l-4.24-5a1 1 0 0 0-1.27-.21L9.22 11.7L4.77 6.36a1 1 0 1 0-1.54 1.28l5 6a1 1 0 0 0 1.28.22l4.28-2.57l4 4.71H15a1 1 0 0 0 0 2h5a1.1 1.1 0 0 0 .36-.07l.14-.08a1 1 0 0 0 .15-.09a.8.8 0 0 0 .14-.17a1 1 0 0 0 .09-.14a.6.6 0 0 0 .05-.17A.8.8 0 0 0 21 17Z" />
                        </svg>
                    )}
                </span>
                <span className="font-semibold text-sm leading-normal">{percent}%</span>
                <span className="font-normal text-sm leading-normal text-[#637381]">last week</span>
            </div>
        </div>

        <div className="w-[5rem]">
            <SparklineChart data={chart} color={chartColor}/>
        </div>
    </div>
  )
};

export default ProductSummaryCard;