"use server";

import { getServerApi } from "../../api/server";
import { serializeStats } from "../../serializers";
import type { GetStatsResponse } from "./get-stats.types";
import type { Stats } from "../../entities";

export async function getStatsAction(): Promise<Stats> {
  const api = await getServerApi();
  const raw = await api.get<GetStatsResponse>("/stats");
  return serializeStats(raw);
}
