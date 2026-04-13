"use client";

import { Card } from "@mantine/core";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import { useTimeSeriesForecastChart } from "./time-series-forecast-chart.hook";
import type { TimeSeriesForecastChartProps } from "./time-series-forecast-chart.types";

export function TimeSeriesForecastChart({
  data,
}: TimeSeriesForecastChartProps) {
  const options = useTimeSeriesForecastChart(data);

  return (
    <Card withBorder radius="md" p="md" mb="md">
      <HighchartsReact highcharts={Highcharts} options={options} />
    </Card>
  );
}
