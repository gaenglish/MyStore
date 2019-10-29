import {CartItem} from './cart.model';

export interface Order {
  id: string;
  userId: string;
  orderDate: string;
  cartItems: CartItem[];
}
