import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs';
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
}
