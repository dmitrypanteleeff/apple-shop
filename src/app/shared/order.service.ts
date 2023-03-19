import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { orderItem } from './interface';
import { environment } from 'src/environments/environment';
import { filter, map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  type: string = 'Phone';
  // cartProducts: orderItem[] = [];

  constructor(private _http: HttpClient) { }

  create( order: orderItem ) {
    return this._http.post(`${environment.fbDbUrl}/orders.json`, order)
      .pipe(map((res: any ) => {
        const obj = {
          ...order,
          date: new Date(order.date),
          id: res.name
        }
        console.log('order service', obj);
        return obj;
      }
    ))
  }

  // getAll(): Observable<productItem[]>  {
  //   return this._http.get<productItem[]>(`${environment.fbDbUrl}/products.json`)
  //     .pipe(map((res: any) => {
  //       console.log('getAll res:', res);
  //       //const data = res;
  //       //return data;
  //       // Object.keys(res) // получаем массив id товаров
  //       //   .map(key => ({
  //       //     ...res[key],
  //       //     id: key,
  //       //     date: new Date(res[key].date)
  //       // }))
  //       const data = Object.keys(res)
  //         .map((key) => ({ id: key, ...res[key], date: new Date(res[key].date) }));
  //       return data;
  //     }))
  //     //.subscribe(goods => { console.log(goods) })
  // }

  // removeById(productId: string | undefined): Observable<productItem>  {
  //   return this._http.delete<productItem>(`${environment.fbDbUrl}/products/${productId}.json`);
  // }
}
