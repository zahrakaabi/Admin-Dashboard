/* -------------------------------------------------------------------------- */
/*                                DEPENDENCIES                                */
/* -------------------------------------------------------------------------- */
// Packages
import { useMemo } from "react";
import type { ApexOptions } from "apexcharts";

// UI Lib Components
import Chart from "react-apexcharts";

/* -------------------------------------------------------------------------- */
/*                           RADIAL CHART COMPONENT                           */
/* -------------------------------------------------------------------------- */
interface RadialChartProps {
    data: number[];
    labels: string[];
    colors: string[];
    height: number
};

function RadialChart({ data, labels, colors, height }: RadialChartProps) {
/* --------------------------------- CONSTS --------------------------------- */
  const series = useMemo(
    () => data || [],
    [data]
  );

  const options: ApexOptions = useMemo(
    () => ({  
      chart: {
        type: "radialBar",
        sparkline: { enabled: false },
      },
      colors: colors,
      labels: labels,
      stroke: { curve: "smooth", width: 10, lineCap: "round" },
      plotOptions: {
        radialBar: {
          hollow: {
            size: "38%",
          },
          track: {
            margin: 9,
            strokeWidth: "100%",
            background: "rgba(145, 158, 171, 0.16)",
          },
          dataLabels: {
            name: {
              offsetY: -8,
              color: "#637381",
              fontSize: "13px",
              fontWeight: 600,
            },
            value: {
              offsetY: 8,
              color: "#1C252E",
              fontSize: "20px",
              fontWeight: 700,
              formatter: (val: number) => `${val}%`, // Show value when hovering over a specific arc
            },
            total: {
              show: true,
              label: "Total",
              color: "#637381",
              fontSize: "13px",
              fontWeight: 600,
              formatter: (w) => {
                const totalSum = w.globals.seriesTotals.reduce(
                  (a: number, b: number) => a + b,
                  0
                );
                return totalSum.toLocaleString();
              },
            },
          },
        },
      },
      legend: {
        show: true,
        position: "bottom",
        horizontalAlign: "center",
        fontSize: "13px",
        fontFamily: "inherit",
        fontWeight: 500,
        itemMargin: {
          horizontal: 12,
          vertical: 8,
        },
        markers: {
          size: 5,
          strokeWidth: 0,
          shape: "circle",
        },
      },
    }),
    [labels, colors]
  );

/* -------------------------------- RENDERING ------------------------------- */
  return (
    <Chart options={options} series={series} type="radialBar" width="100%" height={height} />
  )
};

export default RadialChart;