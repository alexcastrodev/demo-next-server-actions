import { GraphQLClient } from "graphql-request";
import { API_BASE_URL } from "../constants";

export function createGraphqlClient(token?: string) {
  return new GraphQLClient(`${API_BASE_URL}/graphql`, {
    requestMiddleware: (request) => ({
      ...request,
      headers: {
        ...request.headers,
        ...(token && { Authorization: `Bearer ${token}` }),
      },
    }),
  });
}
