export function chunkArray<T>(array: T[], size: number) {
  const myArray = [];
  for (let i = 0; i < array.length; i += size) {
    myArray.push(array.slice(i, i + size));
  }
  return myArray;
}
