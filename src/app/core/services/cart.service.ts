import {Injectable} from '@angular/core';
import {Store} from '@ngrx/store';
import {State} from '../store';
import {DataService} from './data.service';
import {CartItem} from '../models/cart.model';
import {RemoveAllCartItems, RemoveOneCartItem, selectCart, selectCartEntities, selectCartItemCount, UpsertOneCartItem} from '../store/cart.store';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  private cartItems: string[] = [];

  constructor(private store: Store<State>,
              private data: DataService) { }

  cartItems$ = this.store.select(selectCart);
  cartDictionary$ = this.store.select(selectCartEntities);
  cartItemCount$ = this.store.select(selectCartItemCount);

  addCartItem(productId: number, optionId = null, qty = 1) {
    this.cartItems.push(productId + '|' + optionId);
    this.store.dispatch(new UpsertOneCartItem({ productId, optionId, qty }));
  }

  removeCartItem(cartItem: CartItem) {
    const i = this.cartItems.indexOf(cartItem.productId + '|' + cartItem.optionId);
    this.cartItems = this.cartItems.filter(item => item !== cartItem.productId + '|' + cartItem.optionId);
    this.store.dispatch(new RemoveOneCartItem(cartItem));
  }

  removeAllCartItems() {
    this.cartItems = [];
    this.store.dispatch(new RemoveAllCartItems());
  }

  hasItem(productId: number, optionId: number): boolean {
    return this.cartItems.indexOf(productId + '|' + optionId) > -1;
  }
}
