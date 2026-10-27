import { HttpClient } from '@angular/common/http';
import { Service, inject } from '@angular/core';
import { Observable } from 'rxjs';

export interface ItemProduto {
    id: number;
    title: string;
    price: number;
    description: string;
    category: string;
    image: string;
    rating: {
      rate: number,
      count: number
    }
}

@Service()

export class Produto {
    
    private apiUrl = 'https://fakestoreapi.com/products';
    private http = inject(HttpClient);

    obterProdutos(): Observable<ItemProduto[]> {
        return this.http.get<ItemProduto[]>(this.apiUrl);
    }

    obterProdutoPorId(id: number | string): Observable<ItemProduto> {
        return this.http.get<ItemProduto>(`${this.apiUrl}/${id}`);
    }
    
}
