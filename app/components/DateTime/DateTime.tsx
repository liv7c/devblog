import {getISODate, getPostDate} from '~/utils/date';

interface DateTimeProps {
  date: Date;
  className?: string;
}

function DateTime({date, className = ''}: DateTimeProps) {
  return (
    <time dateTime={getISODate(date)} className={className}>
      {getPostDate(date)}
    </time>
  );
}

export default DateTime;
