import { Component, OnInit, Input } from '@angular/core';
import { productItem } from '../shared/interface';
import { ProductService } from '../shared/product.service';

@Component({
  selector: 'app-products',
  templateUrl: './products-page.component.html',
  styleUrls: ['./products-page.component.scss']
})
export class ProductsPageComponent implements OnInit {

  @Input() product!: productItem;

  constructor(public productServ: ProductService) { }

  ngOnInit(): void {

  }

  addToCart(product: productItem): void {
    this.productServ.addProduct(product);
  }

}
