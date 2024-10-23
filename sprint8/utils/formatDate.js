export default function formatDate(date) {
  const onlyDate = date.slice(0, 10);
  return onlyDate.replace(/-/g, '.');
}
