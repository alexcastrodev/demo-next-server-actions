import { api } from "../../api";
import { serializeStats } from "../../serializers";
import type { GetStatsResponse } from "./get-stats.types";
import type { Stats } from "../../entities";

export async function getStats(): Promise<Stats> {
  const raw = await api.get<GetStatsResponse>("/stats");
  return serializeStats(raw);
}
