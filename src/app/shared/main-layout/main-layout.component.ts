import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from '../product.service';

@Component({
  selector: 'app-main-layout',
  templateUrl: './main-layout.component.html',
  styleUrls: ['./main-layout.component.scss']
})
export class MainLayoutComponent implements OnInit {

  type: string = 'Phone';

  constructor(
    private _router: Router,
    public productService: ProductService,
    private _route: ActivatedRoute
  ) { }

  ngOnInit(): void {
  }

  setType(type: string): void {
    this.type = type;

    if (this.type !== 'Cart') {
      // this._router.navigate(['/'], {
      //   queryParams: {
      //     type: this.type
      //   }
      // })

      this._router.navigate(
        ['/'],
        { queryParams: { type: this.type } }
      );

      this.productService.setType(this.type);
    }
  }

}
