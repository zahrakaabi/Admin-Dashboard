/* -------------------------------------------------------------------------- */
/*                                DEPENDENCIES                                */
/* -------------------------------------------------------------------------- */
// Packages
import { useMemo } from "react";
import Chart from "react-apexcharts";
import type { ApexOptions } from "apexcharts";

/* -------------------------------------------------------------------------- */
/*                         SPARK LINE CHART COMPONENT                         */
/* -------------------------------------------------------------------------- */
interface SparklineChartProps {
  data: number[];
  categories?: string[];
  color?: string;
  name?: string;
  height?: number;
}

function SparklineChart({
  data,
  categories = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
  color = "#22c55e",
  name,
  height = 80,
}: SparklineChartProps) {
/* --------------------------------- CONSTS --------------------------------- */
  const series = useMemo(
    () => [{ name, data }],
    [name, data]
  );

  const options: ApexOptions = useMemo(
    () => ({
      chart: {
        type: "area",
        sparkline: { enabled: true },
        toolbar: { show: false },
        zoom: { enabled: false },
      },
      stroke: { curve: "smooth", width: 3, lineCap: "round" },
      fill: {
        type: "gradient",
        gradient: {
          shadeIntensity: 0,
          opacityFrom: 0, //0.32
          opacityTo: 0,
          stops: [0, 100],
        },
      },
      colors: [color],
      dataLabels: { enabled: false },
      markers: { size: 0, hover: { size: 5 } },
      grid: { show: false },
      xaxis: {
        categories,
        labels: { show: false },
        axisBorder: { show: false },
        axisTicks: { show: false },
        tooltip: { enabled: false },
      },
      yaxis: { show: false },
      tooltip: {
        enabled: true,
        x: { show: true },
        y: { formatter: (val: number) => `${val.toLocaleString()}` },
        marker: { show: false },
        custom: ({ series, seriesIndex, dataPointIndex, w }) => {
            const value = series[seriesIndex][dataPointIndex];
            const month = w.globals.categoryLabels[dataPointIndex] ?? w.globals.labels[dataPointIndex];
            const dotColor = w.globals.colors[seriesIndex];

            return `
            <div style="display: flex; flex-direction: column; align-items: center">
                <span style="
                    background: #e2e2e2;
                    margin: 0;
                    color: #374151;
                    padding: 1px 12px;
                    border-radius: 4px;
                    display: inline-block;
                ">
                    ${month}
                </span>
                <div style="display: flex; align-items: center; gap: 6px; padding: 1px 12px;">
                    <span style="
                    margin: 0;
                        width: 8px;
                        height: 8px;
                        border-radius: 50%;
                        background: ${dotColor};
                        display: inline-block;
                    "></span>
                    <span style="font-weight: 600;">${value.toLocaleString()}</span>
                </div>
            </div>
            `;
        },
      },
    }),
    [color, categories]
  );

  return (
    <Chart options={options} series={series} type="area" width="100%" height={height} />
  );
};

export default SparklineChart;