import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { filter, map, Observable } from 'rxjs';
import { fbResponse, productItem } from './interface';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private _http: HttpClient) { }

  create(product:productItem ) {
    return this._http.post(`${environment.fbDbUrl}/products.json`, product)
      .pipe(map((res: any) => {
        const obj = {
          ...product,
          date: new Date(product.date),
          id: res.name
        }
        console.log(3333, obj);
        return obj;
      }
    ))
  }

  getAll(): Observable<productItem[]>  {
    return this._http.get<productItem[]>(`${environment.fbDbUrl}/products.json`)
      .pipe(map((res: any) => {
        console.log('getAll res:', res);
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
    return this._http.patch<productItem>(`${environment.fbDbUrl}/${product.id}.json`, product);
  }
}
