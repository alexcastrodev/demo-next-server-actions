import type Highcharts from "highcharts";
import { useMemo } from "react";
import { tonePalette } from "./time-series-forecast-chart.constants";
import type { TimeSeriesForecastChartData } from "./time-series-forecast-chart.types";

export function useTimeSeriesForecastChart(data: TimeSeriesForecastChartData) {
  return useMemo<Highcharts.Options>(() => {
    const series: Highcharts.SeriesOptionsType[] = data.series
      .filter((item) => item.points.length > 0)
      .map((item) => {
        const palette = tonePalette[item.tone];

        if (item.forecast) {
          return {
            type: "line",
            name: item.name,
            yAxis: item.axis === "left" ? 0 : 1,
            color: palette.stroke,
            dashStyle: "ShortDash",
            marker: { enabled: false },
            lineWidth: 2,
            data: item.points.map((point) => [point.x, point.y]),
          } as Highcharts.SeriesLineOptions;
        }

        return {
          type: "area",
          name: item.name,
          yAxis: item.axis === "left" ? 0 : 1,
          color: palette.stroke,
          lineWidth: 2,
          marker: { enabled: false },
          fillColor: {
            linearGradient: { x1: 0, y1: 0, x2: 0, y2: 1 },
            stops: [
              [0, palette.areaStart],
              [1, palette.areaEnd],
            ],
          },
          threshold: null,
          data: item.points.map((point) => [point.x, point.y]),
        } as Highcharts.SeriesAreaOptions;
      });

    return {
      chart: {
        zooming: { type: "x" },
        backgroundColor: "transparent",
        spacingTop: 8,
        spacingRight: 8,
        spacingBottom: 8,
        spacingLeft: 8,
      },
      credits: { enabled: false },
      title: { text: data.title },
      subtitle: { text: data.subtitle ?? "" },
      legend: {
        align: "left",
        verticalAlign: "top",
      },
      xAxis: {
        type: "datetime",
        lineColor: "#d8dee7",
        tickColor: "#d8dee7",
      },
      yAxis: [
        {
          title: { text: data.leftAxisLabel },
          gridLineColor: "#ebeff4",
        },
        {
          title: { text: data.rightAxisLabel },
          opposite: true,
          gridLineColor: "#f2f5f8",
        },
      ],
      tooltip: {
        shared: true,
        xDateFormat: "%d/%m/%Y %H:%M:%S",
      },
      plotOptions: {
        area: {
          states: {
            hover: {
              lineWidthPlus: 0,
            },
          },
        },
      },
      series,
    };
  }, [data]);
}
