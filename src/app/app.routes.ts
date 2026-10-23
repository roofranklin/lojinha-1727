import { Routes } from '@angular/router';
import { Checkout } from './pages/checkout/checkout';
import { Home } from './pages/home/home';

export const routes: Routes = [
    { path: '', component: Home },
    { path: 'checkout', component: Checkout },
    { path: '**', redirectTo: '' }
];