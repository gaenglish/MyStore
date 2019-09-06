import {CartItem} from '../models/cart.model';
import {Action, createSelector} from '@ngrx/store';
import {State} from './';
import {createEntityAdapter, EntityState} from '@ngrx/entity';

export const adapter = createEntityAdapter<CartItem>({
  selectId: (item: CartItem) => item.productId
});

export interface CartState extends EntityState<CartItem> {}

export const InitialCartState: CartState = adapter.getInitialState();

export enum CartActionTypes {
  UPSERT_ONE = '[Cart] UpsertOne',
  UPSERT_MANY = '[Cart] UpsertMany',
  REMOVE_ONE = '[Cart] RemoveOne',
  REMOVE_MANY = '[Cart] RemoveMany',
  REMOVE_ALL = '[Cart] RemoveAll'
}

export class UpsertOneCartItem implements Action {
  readonly type = CartActionTypes.UPSERT_ONE;
  constructor(public payload: CartItem ) {}
}

export class UpsertManyCartItems implements Action {
  readonly type = CartActionTypes.UPSERT_MANY;
  constructor(public payload: CartItem[] ) {}
}

export class RemoveOneCartItem implements Action {
  readonly type = CartActionTypes.REMOVE_ONE;
  constructor(public payload: number ) {}
}

export class RemoveManyCartItems implements Action {
  readonly type = CartActionTypes.REMOVE_MANY;
  constructor(public payload: number[] ) {}
}

export class RemoveAllCartItems implements Action {
  readonly type = CartActionTypes.REMOVE_ALL;
}

export type CartActions = UpsertOneCartItem
  | UpsertManyCartItems
  | RemoveOneCartItem
  | RemoveManyCartItems
  | RemoveAllCartItems;

export function cartReducer(
  state: CartState = InitialCartState,
  action: CartActions
): any {
  switch (action.type) {
    case CartActionTypes.UPSERT_ONE:
      return adapter.upsertOne(action.payload, state);
    case CartActionTypes.UPSERT_MANY:
      return adapter.upsertMany(action.payload, state);
    case CartActionTypes.REMOVE_ONE:
      return adapter.removeOne(action.payload, state);
    case CartActionTypes.REMOVE_MANY:
      return adapter.removeMany(action.payload, state);
    case CartActionTypes.REMOVE_ALL:
      return adapter.removeAll(state);
    default:
      return state;
  }
}

export const selectCartState = (state: State) => state.cart;

export const {
  selectAll: selectCart,
  selectEntities: selectCartEntities
} = adapter.getSelectors(selectCartState);
