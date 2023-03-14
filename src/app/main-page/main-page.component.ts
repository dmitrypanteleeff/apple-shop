import { Component, OnInit } from '@angular/core';
import { ProductService } from '../shared/product.service';
import { Observable } from 'rxjs';
import { productItem } from '../shared/interface';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.scss']
})
export class MainPageComponent implements OnInit {

  products$: Observable<productItem[]> | undefined;
  type!: string;

  constructor(public productServ: ProductService) {
    //this.productServ.setType(this.type);
  }

  ngOnInit() {
    this.getRequest();
  }

  private getRequest() {
    // this.productServ.getAll().subscribe((goods) => {
    //   this.products$ = goods;
    //   console.log(goods)
    // })
    this.products$ = this.productServ.getAll();
  }

}
