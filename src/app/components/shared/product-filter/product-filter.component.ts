import { Component, EventEmitter, inject, OnInit, Output } from '@angular/core';
import {FormBuilder, FormsModule, ReactiveFormsModule} from '@angular/forms';

import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';
import {MatCheckboxModule} from '@angular/material/checkbox';


import { ProductTypes } from '../../../shared/const/product-typs.const';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { ProductService } from '../../../services/product.service';
import { FlexLayoutModule } from '@angular/flex-layout';


@Component({
  selector: 'app-product-filter',
  templateUrl: './product-filter.component.html',
  styleUrls: ['./product-filter.component.css'],
  imports: [FormsModule, MatFormFieldModule, MatInputModule, MatSelectModule, ReactiveFormsModule, MatCheckboxModule, MatButtonModule, MatIconModule, FlexLayoutModule]
})
export class ProductFilterComponent implements OnInit {
  private readonly _formBuilder = inject(FormBuilder);
  @Output('handleFilter') handleFilter = new EventEmitter();
  
  public filterBySearch: string|undefined;
  public filterByType: string|undefined;
  public filterType = ProductTypes;
  public readonly filterByRange = this._formBuilder.group({
    "0-1000": false,
    "1001-1500": false,
    "1501-3000": false,
    "3001-6000": false,
    "6001-10000": false
  });

  constructor(private productService: ProductService) {}

  ngOnInit() {
  }

  /**
   * Trigger filter through product 
   * @param {Event} event
   * @returns {void}
   * @memberof ProductFilterComponent
   * @author Gaurav Lohar
   */
  public doFilter(event: Event): void{
    this.handleFilter.emit({
      searchBy: this.filterBySearch,
      type: this.filterByType,
      priceRange: this.filterByRange.value,
    });
  }

  /**
   * Trigger reset filter
   * @param {Event} event
   * @returns {void}
   * @memberof ProductFilterComponent
   * @author Gaurav Lohar
   */
  public clear(event: Event): void{
    this.filterBySearch = undefined;
    this.filterByType = undefined;
    this.filterByRange.reset();
    this.handleFilter.emit({
      searchBy: this.filterBySearch,
      type: this.filterByType,
      priceRange: this.filterByRange.value,
    });
  }
}


