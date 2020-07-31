import { OrderItem } from './orderItem.model';

export interface Order {
  id: number;
  name: string;
  phone: string;
  email: string;
  address: string;
  flatNr: string;
  floor?: string;
  paymentMethod: string;
  comment?: string;
  orderItems: Array<OrderItem>;
  fullPrice: number;
  orderDate?: string;
  orderTime?: string;
  deliveryTime?: string;
  orderStatus: string;
}
