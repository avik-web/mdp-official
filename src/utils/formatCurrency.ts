export function formatIndianCurrency(value: string | number): string {
  const num = typeof value === "string" ? Number(value) : value;

  if (isNaN(num)) return "Invalid number";

  if (num < 100000) {
    return num.toLocaleString("en-IN");
  }

  if (num >= 100000 && num < 10000000) {
    const lakhs = (num / 100000).toFixed(2).replace(/\.00$/, "");
    return `${lakhs} Lakh`;
  }

  if (num >= 10000000) {
    const crores = (num / 10000000).toFixed(2).replace(/\.00$/, "");
    return `${crores} Crore`;
  }

  return num.toString();
}
