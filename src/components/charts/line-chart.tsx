/* -------------------------------------------------------------------------- */
/*                                DEPENDENCIES                                */
/* -------------------------------------------------------------------------- */
// Packages
import { useMemo } from "react";
import type { ApexOptions } from "apexcharts";

// UI Lib Components
import Chart from "react-apexcharts";

// Types
import type { ChartSeriesItem } from "@/types";

/* -------------------------------------------------------------------------- */
/*                         SPARK LINE CHART COMPONENT                         */
/* -------------------------------------------------------------------------- */
interface SparklineChartProps {
  data: number[] | ChartSeriesItem[];
  categories?: string[];
  color?: string | string[];
  height?: number;
  name?: string;
  showSparkline?: boolean
};

function SparklineChart({
  data,
  categories = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
  color,
  name = "Series",
  height = 80,
  showSparkline,
}: SparklineChartProps) {
/* --------------------------------- CONSTS --------------------------------- */
  const series: ChartSeriesItem[] = useMemo(() => {
    if (Array.isArray(data) && typeof data[0] === "number") {
      return [{ name, data: data as number[] }];
    }
    return data as ChartSeriesItem[];
  }, [name, data]);

  const isMultiLine = series.length > 1;

  const chartColors = useMemo(() => {
    if (Array.isArray(color)) return color;
    return isMultiLine ? [color || "#1f2937", "#FFAB00", "#00B8D9"] : [color || "#1f2937"];
  }, [color, isMultiLine]);

  const isSparkline = showSparkline !== undefined ? showSparkline : !isMultiLine;

/* ------------------------------ CHART OPTIONS ----------------------------- */
  const options: ApexOptions = useMemo(
    () => ({
      chart: {
        type: "area",
        sparkline: { enabled: isSparkline ? true : false },
        toolbar: { show: false },
        zoom: { enabled: false },
      },
      stroke: { curve: "smooth", width: 3, lineCap: "round" },
      fill: {
        type: "gradient",
        gradient: {
          shadeIntensity: 0,
          opacityFrom: !isSparkline ? 0.42 : 0,
          opacityTo: 0,
          stops: [0, 100],
        },
      },
      colors: chartColors,
      dataLabels: { enabled: false },
      markers: { size: 0, hover: { size: 5 } },
      xaxis: {
        categories,
        type: "category",
        labels: {
          show: !isSparkline,
          style: { colors: "#94a3b8", fontSize: "12px" },
        },
        axisBorder: { show: false },
        axisTicks: { show: false },
        tooltip: { enabled: false },
        crosshairs: {
          show: !isSparkline,
          width: 1,
          position: "back",
          opacity: 0.9,
          stroke: {
            color: "#919EAB",
            dashArray: 3,
          },
        },
      },
      yaxis: {
        show: !isSparkline,
        labels: {
          style: { colors: "#94a3b8", fontSize: "12px" },
          formatter: (val: number) => (val >= 1000 ? `${(val / 1000).toFixed(2)}k` : `${val}`),
        },
      },
      legend: { show: false },
      tooltip: {
        enabled: true,
        shared: true,
        intersect: false,
        x: { show: true },
        marker: { show: false },
        custom: ({ series: seriesData, seriesIndex, dataPointIndex, w }) => {
          const month = w.globals.categoryLabels[dataPointIndex] ?? w.globals.labels[dataPointIndex];

          // Single Line Custom Tooltip
          if (!isMultiLine) {
            const value = seriesData[seriesIndex][dataPointIndex];
            const dotColor = w.globals.colors[seriesIndex];

            return `
              <div style="display: flex; flex-direction: column; align-items: center; padding: 6px;">
                <span style="background: #e2e2e2; margin: 0; color: #374151; padding: 1px 12px; border-radius: 4px; display: inline-block;">
                  ${month}
                </span>
                <div style="display: flex; align-items: center; gap: 6px; padding: 4px 12px 1px 12px;">
                  <span style="width: 8px; height: 8px; border-radius: 50%; background: ${dotColor}; display: inline-block;"></span>
                  <span style="font-weight: 600;">${value.toLocaleString()}</span>
                </div>
              </div>
            `;
          }

          // Multi-Line Custom Tooltip (2+ lines)
          const rowsHtml = w.globals.seriesNames
            .map((seriesName: string, idx: number) => {
              const val = seriesData[idx][dataPointIndex];
              const dotColor = w.globals.colors[idx];
              return `
                <div style="display: flex; align-items: center; justify-content: space-between; gap: 16px; margin-top: 4px;">
                  <div style="display: flex; align-items: center; gap: 6px;">
                    <span style="width: 8px; height: 8px; border-radius: 50%; background: ${dotColor}; display: inline-block;"></span>
                    <span style="color: #64748b; font-size: 12px;">${seriesName}:</span>
                  </div>
                  <span style="font-weight: 600; font-size: 13px; color: #0f172a;">${val.toLocaleString()}</span>
                </div>
              `;
            })
            .join("");

          return `
            <div style="background: #ffffff; padding: 8px 12px; border-radius: 8px; box-shadow: 0 4px 20px rgba(0,0,0,0.1); border: 1px solid #f1f5f9;">
              <div style="font-weight: 600; font-size: 12px; color: #00a76f; text-align: center; margin-bottom: 2px;">
                ${month}
              </div>
              ${rowsHtml}
            </div>
          `;
        },
      },
    }),
    [chartColors, categories, isSparkline, isMultiLine]
  );

/* -------------------------------- RENDERING ------------------------------- */
  return (
    <Chart options={options} series={series} type="area" width="100%" height={height} />
  );
};

export default SparklineChart;