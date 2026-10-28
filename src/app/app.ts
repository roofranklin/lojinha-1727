import { Component } from '@angular/core';
import { Cabecalho } from './componentes/cabecalho/cabecalho';
import { Rodape } from './componentes/rodape/rodape';
import { RouterOutlet } from '@angular/router';

@Component({
  imports: [Cabecalho, Rodape, RouterOutlet],
  selector: 'app-root',
  styleUrl: './app.css',
  templateUrl: './app.html',
})
export class App {
  
}
