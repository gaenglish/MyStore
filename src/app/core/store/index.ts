import {
  ActionReducer,
  ActionReducerMap,
  createFeatureSelector,
  createSelector,
  MetaReducer
} from '@ngrx/store';
import { environment } from '../../../environments/environment';
import {productsReducer, ProductState} from './products.store';


export interface State {
  products: ProductState;
}

export const reducers: ActionReducerMap<State> = {
  products: productsReducer
};


export const metaReducers: MetaReducer<State>[] = !environment.production ? [] : [];
