import { gql } from "graphql-request";
import { getServerGraphqlClient } from "../../api/graphql-server";
import { serializeDevice } from "../../serializers";
import type { GetDevicesResponse as RawGetDevicesResponse } from "./get-devices.types";
import type { GetDevicesResponse } from "../../entities";

const QUERY = gql`
  query GetDevices {
    devices {
      deviceId
      eventCount
      lastSeenAt
    }
  }
`;

export async function getDevices(): Promise<GetDevicesResponse> {
  const client = await getServerGraphqlClient();
  const raw = await client.request<RawGetDevicesResponse>(QUERY);
  return { devices: raw.devices.map(serializeDevice) };
}
