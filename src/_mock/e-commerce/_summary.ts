export interface ProductSummary {
  id: string;
  title: string;
  total: number;
  percent: number;
  trend: "up" | "down";
  chart: number[];
  chartColor: string[];
}

export const PRODUCT_SUMMARY: ProductSummary[] = [
  {
    id: "product-sold",
    title: "Product sold",
    total: 18765,
    percent: 2.6,
    trend: "up",
    chart: [32, 41, 38, 55, 48, 67, 73],
    chartColor: ['green']
  },
  {
    id: "total-balance",
    title: "Total balance",
    total: 187650,
    percent: -0.1,
    trend: "down",
    chart: [95, 91, 88, 90, 84, 82, 80],
    chartColor: ['orange']
  },
  {
    id: "sales-profit",
    title: "Sales profit",
    total: 48720,
    percent: 0.6,
    trend: "up",
    chart: [20, 26, 24, 30, 37, 41, 45],
    chartColor: ['red']
  },
];