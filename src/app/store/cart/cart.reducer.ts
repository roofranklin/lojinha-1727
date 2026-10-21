import { createReducer, on } from "@ngrx/store";
import { Produto } from '../../services/produto';
import { adicionarProduto } from "./cart.actions";

/**
 * ESTADO 
 * Define o formato dos dados guardados no cofre
 */

export interface CartState {
    itens: Produto[];
}

/**
 * ESTADO INICIAL
 * Como o carrinho começa quando a aplicação é aberta pela primeira vez na sessão
 */
export const initialCartState: CartState = {
    itens: [],
}

/**
 * REDUCER
 * Função pura que recebe o estado atual e uma ação disparada
 */
export const cartReducer = createReducer(
    initialCartState,
    on(adicionarProduto, (state, { produto }) => ({
        ...state,
        itens: [...state.itens, produto],
    }))
);
