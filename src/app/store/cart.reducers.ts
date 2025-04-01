import { createReducer, on } from "@ngrx/store";
import { addToCart, removeFromCart } from "./cart.actions";
import { Product } from "../shared/types/product";

export interface State {
    list: Array<Product>;
  }

export const initialState: State = {
    list: []
};

export const cartReducer = createReducer(
    initialState, 
    on(addToCart, (state, {product}) => (console.log, {...state, list: state.list.concat(product) })),
    on(removeFromCart, (state, {product}) => ({...state, list: state.list.filter((item: Product) => item.id != product.id)}))
);