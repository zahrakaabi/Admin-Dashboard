/* -------------------------------------------------------------------------- */
/*                                DEPENDENCIES                                */
/* -------------------------------------------------------------------------- */
// Packages
import { useMemo, useState } from "react";

// UI Local Components
import { CardTitle } from "@/components/cards";
import { SparklineChart } from "@/components/charts";

// Utils
import { TRANSACTIONS } from "@/_mock";
import { TransformTransactionsToChartSeries } from "@/utils";

/* -------------------------------------------------------------------------- */
/*                         YEARLY SALES CARD COMPONENT                        */
/* -------------------------------------------------------------------------- */
function YearlySalesCard() {
/* --------------------------------- CONSTS --------------------------------- */
    const [selectedYear, setSelectedYear] = useState(2026);

    const { series, totalIncome, totalExpenses } = useMemo(() => {
        return TransformTransactionsToChartSeries(TRANSACTIONS, selectedYear);
    }, [selectedYear]);

/* -------------------------------- RENDERING ------------------------------- */
    return (
        <div className="flex flex-col gap-2 p-4 rounded-lg bg-white shadow-lg w-[30rem]">
            {/* Header with Year Selector */}
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" }}>
                <div>
                    <CardTitle title="Yearly Sales" />
                    <span style={{ fontSize: "14px", color: "#637381" }}>(+43%) than last year</span>
                </div>

                {/* Year Select Dropdown */}
                <select
                value={selectedYear}
                onChange={(e) => setSelectedYear(Number(e.target.value))}
                style={{
                    padding: "6px 12px",
                    borderRadius: "8px",
                    border: "1px solid #e2e8f0",
                    fontWeight: 600,
                    cursor: "pointer",
                }}
                >
                    <option value={2025}>2025</option>
                    <option value={2026}>2026</option>
                </select>
            </div>

            {/* Summary Stats Header */}
            <div style={{ display: "flex", gap: "32px", marginBottom: "24px" }}>
                <div>
                <div style={{ display: "flex", alignItems: "center", gap: "8px", fontSize: "13px", color: "#637381" }}>
                    <span style={{ width: "10px", height: "10px", borderRadius: "50%", background: "#00A76F" }} />
                    Total income
                </div>
                <div style={{ fontSize: "20px", fontWeight: 700, marginTop: "4px" }}>
                    {(totalIncome / 1000).toFixed(2)}k
                </div>
                </div>

                <div>
                <div style={{ display: "flex", alignItems: "center", gap: "8px", fontSize: "13px", color: "#637381" }}>
                    <span style={{ width: "10px", height: "10px", borderRadius: "50%", background: "#FFAB00" }} />
                    Total expenses
                </div>
                <div style={{ fontSize: "20px", fontWeight: 700, marginTop: "4px" }}>
                    {(totalExpenses / 1000).toFixed(2)}k
                </div>
                </div>
            </div>

            {/* Chart */}
            <SparklineChart data={series} color={["#00A76F", "#FFAB00"]} height={220} />
        </div>
    )
};

export default YearlySalesCard;