import { Component, OnInit } from '@angular/core';
import { productItem } from '../shared/interface';
import { ProductService } from '../shared/product.service';

@Component({
  selector: 'app-cart-page',
  templateUrl: './cart-page.component.html',
  styleUrls: ['./cart-page.component.scss']
})
export class CartPageComponent implements OnInit {

  products!: productItem[];
  totalPrice: number = 0;

  constructor(public productServ: ProductService) { }

  ngOnInit(): void {
    this.products = this.productServ.cartProducts;
    console.log('this.products.length', this.products.length);
    for (let i = 0; i < this.products.length; i++) {
      console.log(this.products[i].price);
      this.totalPrice = this.totalPrice + +this.products[i].price;
    }
  }

  deleteProduct(product: productItem): void {
    this.productServ.removeProduct(product);
    this.products = this.productServ.cartProducts;
  }
}
