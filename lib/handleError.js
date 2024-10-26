export function handleError(e) {
  console.error(e.message);
  throw new Error();
}
