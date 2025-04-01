import { Component, inject, OnInit } from "@angular/core";
import { MatGridListModule } from '@angular/material/grid-list';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FlexLayoutModule } from "@angular/flex-layout";
import { MatPaginatorModule, PageEvent} from '@angular/material/paginator';

import { Product } from "../../shared/types/product";
import { ProductService } from "../../services/product.service";
import { CardComponent } from "../shared/card/card.component";
import { ProductFilterComponent } from "../shared/product-filter/product-filter.component";


@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css'],
  imports: [MatGridListModule, CardComponent, ProductFilterComponent, FlexLayoutModule, MatPaginatorModule],
})
export class ListComponent implements OnInit {

  private productService = inject(ProductService);
  public _dataSource: Array<Product> = [];
  public _dataSourceTemp: Array<Product> = [];

  length = 0;
  pageSize = 10;
  pageIndex = 0;
  pageSizeOptions = [5, 10, 25];
  showFirstLastButtons = true;

  ngOnInit() {
    this.getAllProducts();
  }

  /**
   * Get all products
   * @returns {void}
   * @memberof ListComponent
   */
  private getAllProducts(): void{
    this.productService.getAllProducts().subscribe((products: Array<Product>)=>{
      if(products){
        this._dataSourceTemp = products;
        this.length = products.length;
        this._dataSource = this._dataSourceTemp.slice(0, this.pageSize);
      }     
    })
  }

  /**
   * Handle pagination event for grid
   * @returns {void}
   * @memberof ListComponent
   */
  handlePageEvent(event: PageEvent): void {
    this.length = event.length;
    this.pageSize = event.pageSize;
    this.pageIndex = event.pageIndex;
    this._dataSource = this._dataSourceTemp.slice(this.pageSize * this.pageIndex, this.pageSize * (this.pageIndex + 1));
  }
  
  /**
   * Handle filtering for product list when triggered
   * @returns {void}
   * @param {searchBy: string, type: string, priceRange: string} filters 
   */
  handleFilter(filters: {searchBy: string, type: string, priceRange: string}): void{
  
    if(!filters.searchBy && !filters.type && Object.values(filters.priceRange).every((value: string|null|undefined) => !value)){
      this.length = this._dataSourceTemp.length;
      this._dataSource = this._dataSourceTemp.slice(0, this.pageSize);
    } else{
      const hasSelectedPriceRange = Object.values(filters.priceRange).some((value: String) => !!value);
      let filtered: Array<Product> = [];
  
      if(filters.searchBy && filters.type && hasSelectedPriceRange){
        filtered = this.getFilteredByRange(filters.priceRange, this.getFilteredByType(filters.type, this.getFilteredByTextValue(filters.searchBy, this._dataSourceTemp)));
      } else if(filters.searchBy && filters.type && !hasSelectedPriceRange){
        filtered = this.getFilteredByType(filters.type, this.getFilteredByTextValue(filters.searchBy, this._dataSourceTemp));      
      } else if(filters.searchBy && !filters.type && hasSelectedPriceRange){
        filtered = this.getFilteredByRange(filters.priceRange, this.getFilteredByTextValue(filters.searchBy, this._dataSourceTemp));
      }else if(!filters.searchBy && filters.type && hasSelectedPriceRange){
        filtered = this.getFilteredByRange(filters.priceRange, this.getFilteredByType(filters.type, this._dataSourceTemp));
      } else if(!filters.searchBy && !filters.type && hasSelectedPriceRange){
        filtered = this.getFilteredByRange(filters.priceRange, this._dataSourceTemp);
      } else if(!filters.searchBy && filters.type && !hasSelectedPriceRange){
        filtered = this.getFilteredByType(filters.type, this._dataSourceTemp);
      }
  
      this.length = filtered.length;
      this._dataSource = filtered.slice(0, this.pageSize);
    }
    
  }

  /**
   * Perform search operation over product list name
   * @param searchBy 
   * @param source 
   * @returns {Array<Product>}
   */
  private getFilteredByTextValue(searchBy: string, source: Array<Product>): Array<Product>{
    return source.filter((product: Product) => product.name.toLowerCase().indexOf(searchBy.toLowerCase()) > -1);
  }

  /**
   * Perform match operation  over product list type
   * @param type 
   * @param source 
   * @returns {Array<Product>}
   */
  private getFilteredByType(type: string, source: Array<Product>): Array<Product>{
    return source.filter((product: Product) => product.category.toLowerCase() == type.toLowerCase());
  }

/**
 * Perform search operation for product list price range
 * @param priceRange 
 * @param source 
 * @returns {Array<Product>}
 */
  private getFilteredByRange(priceRange: any, source: Array<Product>): Array<Product>{  
    const converted = Object.keys(priceRange).map((key: string) => ({
      selected: priceRange[key],
      label: key,
    }));
    const selectedPrice = converted.filter((item: {selected: string, label: string}) => item.selected);
    if(!!selectedPrice && selectedPrice.length > 0){
      const min = selectedPrice[0].label.split('-')[0];
      const max = selectedPrice[selectedPrice.length - 1].label.split('-')[1];      
      return this.getRangeBetween(+min, +max, source);
    } else {
      return source;
    }
  }

  /**
   * Computes product price between min and max values price selected
   * @param {number} min 
   * @param {number} max 
   * @param {Array<Product>} source 
   * @returns {Array<Product>}
   */
  private getRangeBetween(min: number, max: number, source: Array<Product>):  Array<Product>{
    return source.filter((product: Product) => (parseFloat(product.price.toString()) >= parseFloat(min.toString()) &&  parseFloat(product.price.toString()) <= parseFloat(max.toString())));
  }
}

