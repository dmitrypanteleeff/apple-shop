import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { filter, map, Observable } from 'rxjs';
import { fbResponse, productItem } from './interface';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  type: string = 'Phone';
  cartProducts: productItem[] = [];

  constructor(private _http: HttpClient) { }

  create(product:productItem ) {
    return this._http.post(`${environment.fbDbUrl}/products.json`, product)
      .pipe(map((res: any) => {
        const obj = {
          ...product,
          date: new Date(product.date),
          id: res.name
        }
        return obj;
      }
    ))
  }

  getAll(): Observable<productItem[]>  {
    return this._http.get<productItem[]>(`${environment.fbDbUrl}/products.json`)
      .pipe(map((res: any) => {
        //const data = res;
        //return data;
        // Object.keys(res) // получаем массив id товаров
        //   .map(key => ({
        //     ...res[key],
        //     id: key,
        //     date: new Date(res[key].date)
        // }))
        const data = Object.keys(res)
          .map((key) => ({ id: key, ...res[key], date: new Date(res[key].date) }));
        return data;
      }))
      //.subscribe(goods => { console.log(goods) })
  }

  getById(productId: string): Observable<productItem>  {
    return this._http.get<productItem>(`${environment.fbDbUrl}/products/${productId}.json`)
      .pipe(map((res: productItem) => {
        const data = { ...res, date: new Date(res.date) }
        return data;
      }));
  }

  removeById(productId: string | undefined): Observable<productItem>  {
    return this._http.delete<productItem>(`${environment.fbDbUrl}/products/${productId}.json`);
  }

  updateById(product: productItem): Observable<productItem>  {
    return this._http.patch<productItem>(`${environment.fbDbUrl}/products/${product.id}.json`, product);
  }

  setType(type: string): void {
    this.type = type;
  }

  addProduct(product: productItem): void {
    this.cartProducts.push(product)
  }

  removeProduct(product: productItem): void {
    this.cartProducts = this.cartProducts.filter(item => item !== product)
  }
}
