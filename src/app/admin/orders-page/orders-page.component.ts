import { Component, OnInit } from '@angular/core';
import { OrderService } from 'src/app/shared/order.service';
import { Observable, Subscription } from 'rxjs';
import { orderItem } from 'src/app/shared/interface';

@Component({
  selector: 'app-orders-page',
  templateUrl: './orders-page.component.html',
  styleUrls: ['./orders-page.component.scss']
})
export class OrdersPageComponent implements OnInit {

  //product$: Observable<productItem[]> | undefined;
  orders!: orderItem[];
  pSub: Subscription | undefined;
  rSub: Subscription | undefined;

  constructor(
    private orderServ: OrderService
  ) { }

  ngOnInit(): void {
    this.pSub = this.orderServ.getAll().subscribe((goods) => {
      this.orders = goods;
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

  remove(good: orderItem ) {
    this.rSub = this.orderServ.removeById(good.id).subscribe(() => {
      this.orders = this.orders?.filter(item => item.id !== good.id)
    });
  }

}
