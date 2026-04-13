export async function applyResponseInterceptor(
  response: Response,
): Promise<Response> {
  if (!response.ok) {
    throw response;
  }

  return response;
}
