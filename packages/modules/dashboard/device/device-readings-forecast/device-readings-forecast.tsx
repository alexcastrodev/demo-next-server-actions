"use client";

import type { SensorReading } from "core/actions/get-device-readings/get-device-readings.types";
import { TimeSeriesForecastChart } from "ui/time-series-forecast-chart";
import { useDeviceReadingsForecastChartData } from "./device-readings-forecast.hook";

interface DeviceReadingsForecastProps {
  data: SensorReading[];
  deviceId: string;
}

export function DeviceReadingsForecast({
  data,
  deviceId,
}: DeviceReadingsForecastProps) {
  const chartData = useDeviceReadingsForecastChartData({ data, deviceId });

  if (chartData.series.every((series) => series.points.length === 0)) {
    return null;
  }

  return <TimeSeriesForecastChart data={chartData} />;
}
