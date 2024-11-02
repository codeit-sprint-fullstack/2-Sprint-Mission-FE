import { format } from 'date-fns';
import { ko } from 'date-fns/locale';

const formatDate = (dateString, formatType = 'yyyy.MM.dd') => {
  const date = new Date(dateString);

  return format(date, formatType, { locale: ko });
};

export default formatDate;
