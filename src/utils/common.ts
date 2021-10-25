import { chunk } from 'lodash';
import { User, Options } from 'models';
import i18n from 'translation/i18n';

type LabelValue =
  | 'error'
  | 'success'
  | 'warning'
  | 'info'
  | 'inherit'
  | 'disabled'
  | 'action'
  | 'primary'
  | 'secondary';
export const getCurrentUser = () => {
  try {
    const user: User = JSON.parse(localStorage.getItem('user') || '');
    return user;
  } catch (error) {
    return null;
  }
};
export const getColorEnum = (s: string) => {
  if (s === 'ALL') return 'secondary';
  if (s === 'NEW' || s === 'ACTIVE') return 'success';
  if (s === 'WAITING') return 'warning';
  if (s === 'DELETED') return 'error';
  return 'secondary';
};
export const enumToOptions = (list: [], isAll: boolean) => {
  const newArray = chunk(list, list.length / 2);
  const rs = newArray[1].map((e, idx) => ({
    name: i18n.t(`enum.${newArray[0][idx] as string}`),
    value: e,
  }));
  if (isAll) {
    rs.filter((x) => x.value !== '0' || x.value !== 0);
  }
  return rs as unknown as Options[];
};
