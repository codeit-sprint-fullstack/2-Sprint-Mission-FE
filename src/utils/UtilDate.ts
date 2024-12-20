import { format } from "date-fns";

export const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  if (isNaN(date.getTime())) {
    return "";
  }
  return format(date, "yyyy. MM. dd");
};
