import { useMemo } from "react";
import { useTranslation } from "core/i18n";
import type { SensorReading } from "core/actions/get-device-readings/get-device-readings.types";
import type {
  TimeSeriesForecastChartData,
  TimeSeriesForecastPoint,
} from "ui/time-series-forecast-chart/time-series-forecast-chart.types";

interface UseDeviceReadingsForecastChartDataParams {
  data: SensorReading[];
  deviceId: string;
}

function buildForecast(
  points: TimeSeriesForecastPoint[],
): TimeSeriesForecastPoint[] {
  if (points.length < 3) {
    return [];
  }

  const lastWindow = points.slice(-6);
  const n = lastWindow.length;

  let sumX = 0;
  let sumY = 0;
  let sumXY = 0;
  let sumXX = 0;

  for (let i = 0; i < n; i += 1) {
    const x = i;
    const y = lastWindow[i].y;
    sumX += x;
    sumY += y;
    sumXY += x * y;
    sumXX += x * x;
  }

  const denominator = n * sumXX - sumX * sumX;
  const slope = denominator === 0 ? 0 : (n * sumXY - sumX * sumY) / denominator;
  const intercept = (sumY - slope * sumX) / n;

  const inferredStep =
    points.length > 1
      ? Math.max(
          60_000,
          Math.round(
            (points[points.length - 1].x - points[0].x) / (points.length - 1),
          ),
        )
      : 5 * 60_000;

  const lastTimestamp = points[points.length - 1].x;

  return Array.from({ length: 4 }, (_, idx) => {
    const xFuture = n - 1 + (idx + 1);
    const yForecast = intercept + slope * xFuture;
    return {
      x: lastTimestamp + inferredStep * (idx + 1),
      y: yForecast,
    };
  });
}

export function useDeviceReadingsForecastChartData({
  data,
  deviceId,
}: UseDeviceReadingsForecastChartDataParams): TimeSeriesForecastChartData {
  const { t } = useTranslation();

  return useMemo(() => {
    const sortedData = [...data].sort(
      (a, b) =>
        new Date(a.recordedAt).getTime() - new Date(b.recordedAt).getTime(),
    );

    const mapSeries = (
      selector: (reading: SensorReading) => number | null | undefined,
    ): TimeSeriesForecastPoint[] =>
      sortedData
        .map((reading) => {
          const value = selector(reading);
          if (value == null) {
            return null;
          }

          return {
            x: new Date(reading.recordedAt).getTime(),
            y: value,
          };
        })
        .filter((item): item is TimeSeriesForecastPoint => item !== null);

    const temperaturePoints = mapSeries((reading) =>
      reading.__typename === "WaterQualityReading" ? reading.temperature : null,
    );

    return {
      title: `${t("deviceReadings.title")} · ${deviceId}`,
      subtitle: `${t("deviceReadings.columns.recordedAt")} · Area + Forecast`,
      leftAxisLabel: t("deviceReadings.columns.ph"),
      rightAxisLabel: t("deviceReadings.columns.conductivity"),
      series: [
        {
          name: t("deviceReadings.columns.ph"),
          axis: "left",
          tone: "mint",
          points: mapSeries((reading) =>
            reading.__typename === "WaterQualityReading" ? reading.ph : null,
          ),
        },
        {
          name: t("deviceReadings.columns.temperature"),
          axis: "left",
          tone: "amber",
          points: temperaturePoints,
        },
        {
          name: t("deviceReadings.columns.conductivity"),
          axis: "right",
          tone: "sky",
          points: mapSeries((reading) =>
            reading.__typename === "WaterQualityReading"
              ? reading.conductivity
              : null,
          ),
        },
        {
          name: t("deviceReadings.columns.battery"),
          axis: "right",
          tone: "plum",
          points: mapSeries((reading) =>
            reading.__typename === "TelemetryReading" ? reading.battery : null,
          ),
        },
        {
          name: t("deviceReadings.columns.signalStrength"),
          axis: "right",
          tone: "rose",
          points: mapSeries((reading) =>
            reading.__typename === "TelemetryReading"
              ? reading.signalStrength
              : null,
          ),
        },
        {
          name: `${t("deviceReadings.columns.temperature")} Forecast`,
          axis: "left",
          tone: "amber",
          forecast: true,
          points: buildForecast(temperaturePoints),
        },
      ],
    };
  }, [data, deviceId, t]);
}
