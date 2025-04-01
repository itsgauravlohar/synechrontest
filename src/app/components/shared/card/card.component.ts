import { ChangeDetectionStrategy, Component, inject, Input, input, OnInit, signal } from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatIconModule } from '@angular/material/icon';
import {MatDialog, MatDialogModule} from '@angular/material/dialog';

import { Product } from '../../../shared/types/product';
import { ProductDetailsComponent } from '../product-details/product-details.component';
import { CurrencyPipe } from '@angular/common';
import { ProductService } from '../../../services/product.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css'],
  imports: [MatCardModule, MatButtonModule, FlexLayoutModule, MatIconModule, MatDialogModule, CurrencyPipe],
  providers: [ProductService],
})
export class CardComponent {
  @Input('product') public product: Product|undefined;
  @Input('hideAddtoCart') public hideAddtoCart: Boolean = false;
  public _snackBar = inject(MatSnackBar);

  private readonly dialog = inject(MatDialog);
  private productService = inject(ProductService);

  /**
   * View Product details
   * @returns {void}
   */
  openViewDialog(): void{
    const dialogRef = this.dialog.open(ProductDetailsComponent, {
      data: {
        product: this.product,
      },
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result){
        this._snackBar.open("Product Added to Cart..!", 'X', {duration: 2000});
      }
    });

  }
}
