import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { productItem } from '../shared/interface';
import { OrderService } from '../shared/order.service';
import { ProductService } from '../shared/product.service';

@Component({
  selector: 'app-cart-page',
  templateUrl: './cart-page.component.html',
  styleUrls: ['./cart-page.component.scss']
})
export class CartPageComponent implements OnInit {

  products!: productItem[];
  totalPrice: number = 0;

  form: FormGroup;
  submitted: boolean = false;

  constructor(
    public productServ: ProductService,
    private orderServ: OrderService,
    private _router: Router
  ) {
    this.form = new FormGroup({
      name: new FormControl(null,Validators.required),
      phone: new FormControl(null, [
        Validators.required,
        Validators.pattern("[0-9]{11}")
      ]),
      address: new FormControl(null,Validators.required),
      payment: new FormControl('Cash')
    })
  }

  ngOnInit(): void {
    this.products = this.productServ.cartProducts;
    console.log('this.products.length', this.products.length);
    for (let i = 0; i < this.products.length; i++) {
      console.log(this.products[i].price);
      this.totalPrice = this.totalPrice + +this.products[i].price;
    }
  }

  deleteProduct(product: productItem): void {
    this.totalPrice = this.totalPrice - +product.price;
    //this.totalPrice -= +product.price;
    this.productServ.removeProduct(product);
    this.products = this.productServ.cartProducts;
  }


  submit() {
    if (this.form.invalid) {
      return;
    }

    this.submitted = true;

    const order = {
      name: this.form.value.name,
      phone: this.form.value.phone,
      address: this.form.value.address,
      payment: this.form.value.payment,
      price: this.totalPrice,
      products: this.products,
      date: new Date()
    }

    this.orderServ.create(order).subscribe(res => {
      this.form.reset();
      this.submitted = false;
    })

    // this._productService.create(product).subscribe(res => {
    //   this.form.reset();
    //   this.submitted = false;
    //   this._router.navigate(['/']);
    // } );

    console.log(order)
  }
}
