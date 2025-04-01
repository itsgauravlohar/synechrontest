import { Component, inject, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { selectCart } from '../../store/cart.selector';
import { AsyncPipe } from '@angular/common';
import { PageEvent } from '@angular/material/paginator';
import { CardComponent } from "../shared/card/card.component";
import { FlexLayoutModule } from '@angular/flex-layout';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
  imports: [AsyncPipe, CardComponent, FlexLayoutModule]
})
export class CartComponent {
  private readonly store = inject(Store);
  readonly _dataSource = this.store.select(selectCart);
}
