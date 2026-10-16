import { Component, OnInit, signal } from '@angular/core';
import { Carrinho } from '../../services/carrinho';
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
    private cartService: Carrinho
  ) {}


  ngOnInit(): void {
    this.carregarProdutos();
  }

  carregarProdutos(): void {
    this.productService.obterProdutos().subscribe((dados) => {
      this.produtos.set(dados);
      this.carregando.set(false);
    })
  }

  receberProduto(produto: any) {
    console.log('Produto adicionado:', produto?.title);
    this.cartService.adicionar(produto);
  }
}
