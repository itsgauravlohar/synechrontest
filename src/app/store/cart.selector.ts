import { createSelector, createFeatureSelector } from '@ngrx/store';
import { Product } from "../shared/types/product";


export interface AppState {
    list: Product[];
  }

export const featureKey = 'product';

export interface FeatureState {
  list: Product[];
}

export const allCartProducts = createFeatureSelector<FeatureState>(featureKey);

export const selectCart = createSelector(
  allCartProducts,
  (state: FeatureState) => state.list
);