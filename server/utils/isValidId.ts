export function isValidId(id: string) {
  const num = Math.floor(Number(id));
  return num !== Infinity && String(num) === id && num >= 0;
}
