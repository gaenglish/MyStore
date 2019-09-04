import {
  ActionReducer,
  ActionReducerMap,
  createFeatureSelector,
  createSelector,
  MetaReducer
} from '@ngrx/store';
import { environment } from '../../../environments/environment';
import {productsReducer, ProductState} from './products.store';

export interface AppState {
  products: ProductState;
}

export const appReducer: ActionReducerMap<AppState> = {
  products: productsReducer
};

export const metaReducers: MetaReducer<AppState>[] = !environment.production ? [] : [];
