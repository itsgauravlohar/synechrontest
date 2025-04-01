import { createAction, props } from "@ngrx/store";
import { Product } from "../shared/types/product";

export const addToCart = createAction(`[Product] added to Cart`, props<{product: Product}>());
export const removeFromCart = createAction(`[Product] removed from Cart`, props<{product: Product}>());
