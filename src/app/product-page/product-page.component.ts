import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, switchMap } from 'rxjs';
import { productItem } from '../shared/interface';
import { ProductService } from '../shared/product.service';

@Component({
  selector: 'app-product-page',
  templateUrl: './product-page.component.html',
  styleUrls: ['./product-page.component.scss']
})
export class ProductPageComponent implements OnInit {

  product$: Observable<productItem> | undefined;

  constructor(
    private productServ: ProductService,
    private _route: ActivatedRoute
  ) { }

  ngOnInit(): void {

    this.product$ = this._route.params
      .pipe(switchMap((params) => {
        return this.productServ.getById(params['id'])
      }))
  }

  addToCart(product: productItem): void {
    product = {
      ...product,
      id: this._route.snapshot.params['id']
    }
    this.productServ.addProduct(product);
  }

}
