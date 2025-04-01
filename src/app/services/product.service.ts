import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { BehaviorSubject, Observable} from 'rxjs';

const apiUrl = 'http://localhost:3000';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private http = inject(HttpClient);

  private url = apiUrl;

  public savedToCart$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  /***
   * Method used to fetch all products available
   * @memberof ProductService
   * @author Gaurav Lohar
   * @returns { Observable<any> }
   */
  getAllProducts(): Observable<any> {
    return this.http.get(this.url + '/products');
  }
}
