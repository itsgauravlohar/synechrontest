import { Routes } from '@angular/router';
import { ListComponent } from './components/list/list.component';
import { CartComponent } from './components/cart/cart.component';

export const routes: Routes = [

    {
        path:"list",
        component: ListComponent,
    },
    {
        path: 'view',
        component: CartComponent,
    },
    {
        path:'',
        redirectTo:'/list',
        pathMatch:'full',
    },
    {
        path:'*',
        redirectTo:'list',
    },
];
