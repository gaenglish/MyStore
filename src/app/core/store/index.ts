import {
  ActionReducer,
  ActionReducerMap,
  MetaReducer
} from '@ngrx/store';
import {productsReducer, ProductState} from './products.store';
import {cartReducer, CartState} from './cart.store';
import { localStorageSync } from 'ngrx-store-localstorage';

const STORE_KEYS_TO_PERSIST = ['cart', 'products'];

export interface State {
  products: ProductState;
  cart: CartState;
}

export const reducers: ActionReducerMap<State> = {
  products: productsReducer,
  cart: cartReducer
};

export function localStorageSyncReducer(reducer: ActionReducer<any>): ActionReducer<any> {
  return localStorageSync({
    keys: STORE_KEYS_TO_PERSIST,
    rehydrate: true,
  })(reducer);
}

export const metaReducers: MetaReducer<State>[] = [localStorageSyncReducer];
