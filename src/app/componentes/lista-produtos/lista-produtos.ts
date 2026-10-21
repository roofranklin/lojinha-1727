import { Component, OnInit, signal } from '@angular/core';
import { Store } from '@ngrx/store';
import { adicionarProduto } from '../../store/cart';
import { Produto, ItemProduto } from '../../services/produto';
import { CardProduto } from '../card-produto/card-produto';

@Component({
  imports: [CardProduto],
  selector: 'app-lista-produtos',
  styleUrl: './lista-produtos.css',
  templateUrl: './lista-produtos.html',
})

export class ListaProdutos implements OnInit {

  produtos = signal<ItemProduto[]>([]);
  carregando = signal(true);

  constructor(
    private productService: Produto,
    private store: Store,
  ) {}


  ngOnInit(): void {
    this.carregarProdutos();
  }

  carregarProdutos(): void {
    this.productService.obterProdutos().subscribe({
      next: (dados) => {
        this.produtos.set(dados);
        this.carregando.set(false);
      },
      error: (erro) => {
        console.error('Ops, deu um erro aqui: ', erro.message);
        this.carregando.set(false);
        alert('Ocorreu um erro ao carregar a lista de produtos.');
      }
    })
  }

  receberProduto(produto: any) {
    console.log('Produto adicionado:', produto?.title);
    this.store.dispatch(adicionarProduto({ produto }));
  }
}
