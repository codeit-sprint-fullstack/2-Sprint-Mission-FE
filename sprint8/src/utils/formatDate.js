export default function formatDate(date) {
  const onlyDate = String(date).slice(0, 10);
  return onlyDate.replace(/-/g, '.');
}
