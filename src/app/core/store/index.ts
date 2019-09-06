import {
  ActionReducer,
  ActionReducerMap,
  createFeatureSelector,
  createSelector,
  MetaReducer
} from '@ngrx/store';
import { environment } from '../../../environments/environment';
import {productsReducer, ProductState} from './products.store';
import {cartReducer, CartState} from './cart.store';


export interface State {
  products: ProductState;
  cart: CartState;
}

export const reducers: ActionReducerMap<State> = {
  products: productsReducer,
  cart: cartReducer
};


export const metaReducers: MetaReducer<State>[] = !environment.production ? [] : [];
