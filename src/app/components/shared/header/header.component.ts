import { Component, inject, OnInit } from '@angular/core';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatToolbarModule} from '@angular/material/toolbar';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { Store } from '@ngrx/store';
import { Product } from '../../../shared/types/product';
import { AsyncPipe } from '@angular/common';
import { selectCart } from '../../../store/cart.selector';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
  imports: [ MatToolbarModule, MatButtonModule, MatIconModule, RouterLink]
})
export class HeaderComponent implements OnInit {

  private readonly store = inject(Store);
  readonly _dataSource =  this.store.select(selectCart);
  public cartCount = 0;

  ngOnInit() {
    this._dataSource.subscribe((result: Product[])=>{
      this.cartCount = result.length;
    })
  }

  
}
