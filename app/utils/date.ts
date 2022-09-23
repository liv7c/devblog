import {DateTime} from 'luxon';

export function getPostDate(date: Date) {
  return DateTime.fromJSDate(date).toLocaleString(DateTime.DATE_MED);
}

export function getISODate(date: Date) {
  return DateTime.fromJSDate(date).toISODate();
}
