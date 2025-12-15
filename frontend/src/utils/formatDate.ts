export function formatDate(timestamp: string): string {
  const date = new Date(parseInt(timestamp));
  const options: Intl.DateTimeFormatOptions = { day: "2-digit", month: "short", year: "numeric" };
  return date.toLocaleDateString("en-US", options);
}
