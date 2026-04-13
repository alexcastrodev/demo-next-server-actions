import type { TimeSeriesForecastTone } from "./time-series-forecast-chart.types";

export const tonePalette: Record<
  TimeSeriesForecastTone,
  { stroke: string; areaStart: string; areaEnd: string }
> = {
  mint: {
    stroke: "#3f8f74",
    areaStart: "rgba(99, 192, 160, 0.34)",
    areaEnd: "rgba(99, 192, 160, 0.04)",
  },
  sky: {
    stroke: "#4d7ab8",
    areaStart: "rgba(108, 166, 236, 0.30)",
    areaEnd: "rgba(108, 166, 236, 0.04)",
  },
  amber: {
    stroke: "#c08137",
    areaStart: "rgba(230, 170, 99, 0.30)",
    areaEnd: "rgba(230, 170, 99, 0.04)",
  },
  plum: {
    stroke: "#8063b8",
    areaStart: "rgba(150, 127, 210, 0.30)",
    areaEnd: "rgba(150, 127, 210, 0.04)",
  },
  rose: {
    stroke: "#c06a8f",
    areaStart: "rgba(221, 127, 166, 0.30)",
    areaEnd: "rgba(221, 127, 166, 0.04)",
  },
};
