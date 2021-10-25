export interface PaginationRequest {
  page?: number;
  pageSize?: number;
  keySearch?: string;
  sortType?: number;
  colName?: string;
}
export interface Response<T> {
  pageNumber: number;
  pageSize: number;
  totalNumberOfPages: number;
  totalNumberOfRecords: number;
  results: T[];
}
export type TOrder = {
  id: number;
  status: OrderStatus;
  paymentType: PaymentType;
};
export enum OrderStatus {
  COMPLETE = 'Hoàn thành',
  CANCEL_AFTER_COOK = 'Hủy sau chế biến',
  CANCEL_BEFORE_COOK = 'Hủy trước chế biến',
}

export enum PaymentType {
  AT_RESTAURANT = 'Tại quán',
  DELIVERY = 'Giao hàng',
  TAKE_AWAY = 'Mang đi',
  CREDIT = 'Nạp thẻ',
}
export interface Options {
  id: number | string;
  name: string;
}
export interface GridItemObj {
  id: number | string;
  name: string;
  image?: string;
  description?: string;
}
