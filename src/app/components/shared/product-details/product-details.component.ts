import { Component, inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { Product } from '../../../shared/types/product';
import { MatButtonModule } from '@angular/material/button';
import { CurrencyPipe } from '@angular/common';
import { Store } from '@ngrx/store';
import { addToCart } from '../../../store/cart.actions';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css'],
  imports: [MatButtonModule, MatIconModule, MatDialogModule, CurrencyPipe]
})
export class ProductDetailsComponent {
  readonly dialogRef = inject(MatDialogRef<ProductDetailsComponent>);
  private readonly data = inject(MAT_DIALOG_DATA);
  private store = inject(Store); 
  public product : Product = this.data.product;

  /**
   * 
   * @param Product 
   */
  addToCart(product: Product): void{
    this.store.dispatch(addToCart({product: product}));
    setTimeout(()=>{
      this.dialogRef.close(true);
    }, 500);
  }

}
