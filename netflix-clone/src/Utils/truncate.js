export const truncate = (str, n) => {
  if (!str) return "";

  return str.length > n
    ? str.substring(0, n - 1) + "..."
    : str;
};