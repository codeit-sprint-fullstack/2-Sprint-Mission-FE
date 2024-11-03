import { format, parseISO } from "date-fns";
export default function convertDate(dateString) {
  const date = parseISO("2023-11-03T12:00:00Z");
  const formattedDate = format(date, "yyyy. MM. dd");
  return formattedDate;
}
