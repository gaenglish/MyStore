import {Product} from '../models/product.model';
import {Action, createSelector} from '@ngrx/store';
import {AppState} from './';
import {createEntityAdapter, EntityState} from '@ngrx/entity';

export const adapter = createEntityAdapter<Product>({
  selectId: (product: Product) => product.id
});

export interface ProductState extends EntityState<Product> {}

export const InitialProductState: ProductState = adapter.getInitialState();

export enum ProductActionTypes {
  UPSERT_ONE = '[Products] UpsertOne',
  UPSERT_MANY = '[Products] UpsertMany',
  REMOVE_ONE = '[Products] RemoveOne',
  REMOVE_MANY = '[Products] RemoveMany',
  REMOVE_ALL = '[Products] RemoveAll'
}

export class UpsertOneProduct implements Action {
  readonly type = ProductActionTypes.UPSERT_ONE;
  constructor(public payload: Product ) {}
}

export class UpsertManyProducts implements Action {
  readonly type = ProductActionTypes.UPSERT_MANY;
  constructor(public payload: Product[] ) {}
}

export class RemoveOneProduct implements Action {
  readonly type = ProductActionTypes.REMOVE_ONE;
  constructor(public payload: number ) {}
}

export class RemoveManyProducts implements Action {
  readonly type = ProductActionTypes.REMOVE_MANY;
  constructor(public payload: number[] ) {}
}

export class RemoveAllProducts implements Action {
  readonly type = ProductActionTypes.REMOVE_ALL;
}

export type ProductActions = UpsertOneProduct
  | UpsertManyProducts
  | RemoveOneProduct
  | RemoveManyProducts
  | RemoveAllProducts;

export function productsReducer(
  state: ProductState = InitialProductState,
  action: ProductActions
): any {
  switch (action.type) {
    case ProductActionTypes.UPSERT_ONE:
      return adapter.upsertOne(action.payload, state);
    case ProductActionTypes.UPSERT_MANY:
      return adapter.upsertMany(action.payload, state);
    case ProductActionTypes.REMOVE_ONE:
      return adapter.removeOne(action.payload, state);
    case ProductActionTypes.REMOVE_MANY:
      return adapter.removeMany(action.payload, state);
    case ProductActionTypes.REMOVE_ALL:
      return adapter.removeAll(state);
    default:
      return state;
  }
}

export const selectProductState = (state: AppState) => state.products;

export const {
  selectAll: selectAllProducts,
  selectEntities: selectProductEntities
} = adapter.getSelectors(selectProductState);

export const selectProduct = (productId: number) => createSelector(selectProductEntities, products => products[productId]);

export const selectProducts = (productIds: number[]) => createSelector(selectAllProducts, products => products);
