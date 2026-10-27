import { Component, inject, OnInit, signal } from '@angular/core';
import { CommonModule, CurrencyPipe } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Store } from '@ngrx/store';
import { Produto, ItemProduto } from '../../services/produto';
import { adicionarProduto } from '../../store/cart';

@Component({
  imports: [CommonModule, CurrencyPipe, RouterLink],
  selector: 'app-produto-detalhe',
  styleUrl: './produto-detalhe.css',
  templateUrl: './produto-detalhe.html',
})
export class ProdutoDetalhe implements OnInit {

  private route = inject(ActivatedRoute);
  private productService = inject(Produto);
  private store = inject(Store);

  carregando = signal<boolean>(true);
  produto = signal<ItemProduto | null>(null);
  erro = signal<string | null>(null);
  adicionado = signal<boolean>(false);

  ngOnInit(): void {
    // Lendo o parâmetro ID definido na rota
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.carregarProduto(id);
    } else {
      this.erro.set('Produto não encontrado');
      this.carregando.set(false);
    }
  }
  carregarProduto(id: string): void {
    this.carregando.set(true);
    this.productService.obterProdutoPorId(id).subscribe({
      next: (dados) => {
        this.produto.set(dados);
        this.carregando.set(false);
      },
      error: () => {
        this.erro.set('Não foi possível carregar os dados do produto');
        this.carregando.set(false);
      }
    });
  }
  adicionarAoCarrinho(): void {
    const prod = this.produto();
    if (prod) {
      this.store.dispatch(adicionarProduto({ produto: prod }));
      this.adicionado.set(true);
    }
  }
}

