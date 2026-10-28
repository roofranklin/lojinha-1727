import { Component, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { selectQuantItens, limparCarrinho } from '../../store/cart';
import { RouterLink } from '@angular/router';

@Component({
  imports: [RouterLink],
  selector: 'app-cabecalho',
  styleUrl: './cabecalho.css',
  templateUrl: './cabecalho.html',
})

export class Cabecalho {
  private store = inject(Store);

  // LENDO O COFRE
  quantidade = this.store.selectSignal(selectQuantItens);

  // DISPATCH PARA ESVAZIAR O CARRINHO
  esvaziarCarrinho() {
    this.store.dispatch(limparCarrinho());
  }
}
