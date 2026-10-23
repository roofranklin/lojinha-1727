import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { Store } from '@ngrx/store';
import { limparCarrinho, selectItensCarrinho, selectQuantItens } from '../../store/cart'


@Component({
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  selector: 'app-checkout',
  styleUrl: './checkout.css',
  templateUrl: './checkout.html',
})
export class Checkout {
  private fb = inject(FormBuilder);
  private store = inject(Store);

  // Lendo dados do cofre
  quantidade = this.store.selectSignal(selectQuantItens);
  itens = this.store.selectSignal(selectItensCarrinho);

  pedidoConcluido = signal(false);

  // Formulário reativo com validações
  checkoutForm: FormGroup = this.fb.group({
    nome: ['', [Validators.required, Validators.minLength(3)]],
    email: ['', [Validators.required, Validators.email]],
    cep: ['', [Validators.required, Validators.pattern(/^\d{5}-?\d{3}$/)]],
    endereco: ['', [Validators.required, Validators.minLength(5)]],
    pagamento: ['cartao', [Validators.required]],
  });

  // Opcional: Método auxiliar pra facilitar checagem de erros no template
  isCampoInvalido(campo: string) {
    const controle = this.checkoutForm.get(campo);
    return !!(controle && controle.invalid && (controle.dirty || controle.touched ));
  }

  finalizarPedido(): void {
    if (this.checkoutForm.invalid) {
      // Marca todos os campos como tocados para exibir os erros em tela
      this.checkoutForm.markAllAsTouched();
    }

    // Processa o pedido com sucesso
    this.pedidoConcluido.set(true);

    this.store.dispatch(limparCarrinho());

    this.checkoutForm.reset({
      pagamento: 'cartao',
    });
  }
}
