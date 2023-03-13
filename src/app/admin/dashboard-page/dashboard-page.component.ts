import { Component, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { productItem } from 'src/app/shared/interface';
import { ProductService } from 'src/app/shared/product.service';

@Component({
  selector: 'app-dashboard-page',
  templateUrl: './dashboard-page.component.html',
  styleUrls: ['./dashboard-page.component.scss']
})
export class DashboardPageComponent implements OnInit {

  //product$: Observable<productItem[]> | undefined;
  products!: productItem[];
  pSub: Subscription | undefined;
  rSub: Subscription | undefined;
  productName: string | undefined;

  constructor(
    private productServ: ProductService
  ) { }

  ngOnInit(): void {
    this.pSub = this.productServ.getAll().subscribe((goods) => {
      this.products = goods;
      console.log(goods)
    })
  }

  ngOnDestroy(): void {
    if (this.pSub) {
      this.pSub.unsubscribe();
      console.log('unsubscribe')
    }
    if (this.rSub) {
      this.rSub.unsubscribe();
    }
  }

  goodInfo(text: string) {
    let shortText = text.split('');
    let shortTextResult = [];
    for (let i = 0; i < 70; i++ ) {
      shortTextResult.push(shortText[i])
    }
    return shortTextResult.join('');
  }

  remove(good: productItem ) {
    this.rSub = this.productServ.removeById(good.id).subscribe(() => {
      this.products = this.products?.filter(product => product.id !== good.id)
    });
  }

}
