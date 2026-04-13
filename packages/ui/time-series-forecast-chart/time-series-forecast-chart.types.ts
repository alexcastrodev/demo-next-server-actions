export interface TimeSeriesForecastPoint {
  x: number;
  y: number;
}

export type TimeSeriesForecastTone = "mint" | "sky" | "amber" | "plum" | "rose";

export interface TimeSeriesForecastSeries {
  name: string;
  points: TimeSeriesForecastPoint[];
  axis: "left" | "right";
  tone: TimeSeriesForecastTone;
  forecast?: boolean;
}

export interface TimeSeriesForecastChartData {
  title: string;
  subtitle?: string;
  leftAxisLabel: string;
  rightAxisLabel: string;
  series: TimeSeriesForecastSeries[];
}

export interface TimeSeriesForecastChartProps {
  data: TimeSeriesForecastChartData;
}
