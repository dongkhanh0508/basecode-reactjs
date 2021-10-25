import { format, formatDistanceToNow } from 'date-fns';

// ----------------------------------------------------------------------

export function fDate(date: string | number | Date) {
  return format(new Date(date), 'dd MMMM yyyy');
}

export function fDateTime(date: string | number | Date) {
  return format(new Date(date), 'dd MMM yyyy HH:mm');
}

export function fDateTimeSuffix(date: string | number | Date) {
  return format(new Date(date), 'dd/MM/yyyy hh:mm p');
}
export function fDateTimeSuffix2(date: string | number | Date) {
  try {
    return format(new Date(date), 'dd/MM/yyyy HH:mm');
  } catch (error) {
    return '-';
  }
}
export function fDateTimeSuffix3(date: string | number | Date) {
  try {
    return format(new Date(date), 'dd/MM/yyyy');
  } catch (error) {
    return '-';
  }
}

export function fToNow(date: string | number | Date) {
  return formatDistanceToNow(new Date(date), {
    addSuffix: true,
  });
}
