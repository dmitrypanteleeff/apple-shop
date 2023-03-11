import { Component, OnInit, Input } from '@angular/core';
import { productItem } from '../shared/interface';

@Component({
  selector: 'app-product-page',
  templateUrl: './product-page.component.html',
  styleUrls: ['./product-page.component.scss']
})
export class ProductPageComponent implements OnInit {

  @Input() product: any;

  constructor() { }

  ngOnInit(): void {
    console.log(this.product)
  }

}
