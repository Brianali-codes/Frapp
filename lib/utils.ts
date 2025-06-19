
export const cn = (...classes: any[]) => {
  const seen = new Set<string>();
  const result: string[] = [];

  classes
    .flatMap(c => c?.trim().split(/\s+/)) // split space-separated classes
    .reverse() // process in reverse to keep the last version
    .forEach(cls => {
      if (cls && !seen.has(cls)) {
        seen.add(cls);
        result.push(cls);
      }
    });

  return result.reverse().join(" ");
};

export const formatDate = (date: string | Date) => {
  if (!date || date === "N/A") return date
  const d = new Date(date);
  const day = d.getDate();
  const month = new Intl.DateTimeFormat("en-US", { month: "short" }).format(d);
  const year = d.getFullYear();

  const getOrdinal = (n: number) => {
    const s = ["th", "st", "nd", "rd"];
    const v = n % 100;
    return s[(v - 20) % 10] || s[v] || s[0];
  };

  return `${day}${getOrdinal(day)} ${month}, ${year}`;
};