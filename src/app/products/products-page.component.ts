import { Component, OnInit, Input } from '@angular/core';
import { productItem } from '../shared/interface';

@Component({
  selector: 'app-products',
  templateUrl: './products-page.component.html',
  styleUrls: ['./products-page.component.scss']
})
export class ProductsPageComponent implements OnInit {

  @Input() product: any;

  constructor() { }

  ngOnInit(): void {

  }

}
