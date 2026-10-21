import { createAction, props } from '@ngrx/store';
import { Produto } from '../../services/produto';

/**
 * ACTIONS
 * Representam a intenção de mudar o estado.
 * São mensagens que dizem o que aconteceu no componente, não alteram o estado diretamente
 */

export const adicionarProduto = createAction(
    '[Carrinho] Adicionar Produto',
    props<{ produto: Produto }>()
);

