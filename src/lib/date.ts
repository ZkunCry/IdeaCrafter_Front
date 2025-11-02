function formatDate(dateInput: string | Date): string {
  const date = new Date(dateInput);
  return date.toLocaleDateString("ru-RU", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export { formatDate };
