function formatDate(dateInput: string | Date): string {
  const date = new Date(dateInput);

  if (Number.isNaN(date.getTime())) return "";

  return date.toLocaleDateString("ru-RU", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export { formatDate };
