import {Injectable} from '@angular/core';
import {Store} from '@ngrx/store';
import {State} from '../store';
import {DataService} from './data.service';
import {coldObservablePersist} from '../util/cold-observable';
import {CartItem} from '../models/cart.model';
import {RemoveAllCartItems, RemoveOneCartItem, selectCart, selectCartEntities, UpsertOneCartItem} from '../store/cart.store';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  constructor(private store: Store<State>,
              private data: DataService) { }

  cart$ = this.store.select(selectCart);
  cartDictionary$ = this.store.select(selectCartEntities);

  addCartItem(productId: number, qty = 1) {
    this.store.dispatch(new UpsertOneCartItem({ productId, qty }));
  }

  removeCartItem(productId: number) {
    this.store.dispatch(new RemoveOneCartItem(productId));
  }

  removeAllCartItems() {
    this.store.dispatch(new RemoveAllCartItems());
  }
}
