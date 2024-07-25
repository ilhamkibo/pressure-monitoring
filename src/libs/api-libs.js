export async function getLogResponse(resource, query) {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/${resource}?${query}`
  );
  const logs = await response.json();
  return logs;
}
