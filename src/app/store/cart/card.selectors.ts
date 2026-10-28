import { createFeatureSelector, createSelector } from "@ngrx/store";
import { CartState } from "./cart.reducer";


/**
 * SELECTORS
 * Funções usadas para let fatias específicas do cofre
 */

// 1. Pega a fatia principal do cofre global
export const selectCartState = createFeatureSelector<CartState>('cart');

// 2. Lê a lista completa de itens do carrinho
export const selectItensCarrinho = createSelector(
    selectCartState,
    (state) => state.itens
);

// 3. Lê só a quantidade total de itens no carrinho
export const selectQuantItens = createSelector(
    selectCartState,
    (state) => state.itens.length
);