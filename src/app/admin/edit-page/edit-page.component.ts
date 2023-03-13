import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap } from 'rxjs';
import { productItem } from 'src/app/shared/interface';
import { ProductService } from 'src/app/shared/product.service';

@Component({
  selector: 'app-edit-page',
  templateUrl: './edit-page.component.html',
  styleUrls: ['./edit-page.component.scss']
})
export class EditPageComponent implements OnInit {

  form: FormGroup;
  product!: productItem;
  submitted: Boolean = false;
  id: string;

  constructor(
    private _route: ActivatedRoute,
    private productServ: ProductService,
    private _router: Router
  ) {
    this.form = new FormGroup({
      type: new FormControl(null, Validators.required),
      title: new FormControl(null, Validators.required),
      photo: new FormControl(null, Validators.required),
      info: new FormControl(null, Validators.required),
      price: new FormControl(null, Validators.required)
    });
    // this.id = this._route.snapshot.paramMap.get('id');
    this.id = _route.snapshot.params['id'];
  }

  ngOnInit(): void {
    this._route.params.pipe(
      switchMap(params => {
        return this.productServ.getById(params['id'])
      })
    ).subscribe(product => {
      this.product = product;

      this.form = new FormGroup({
        type: new FormControl(this.product.type,Validators.required),
        title: new FormControl(this.product.title,Validators.required),
        photo: new FormControl(this.product.photo,Validators.required),
        info: new FormControl(this.product.info,Validators.required),
        price: new FormControl(this.product.price, Validators.required),
      })
    })
  }

  submit() {
    if (this.form.invalid) {
      return;
    }

    this.submitted = true;

    this.product = {
      ...this.product,
      type: this.form.value.type,
      title: this.form.value.title,
      photo: this.form.value.photo,
      info: this.form.value.info,
      price: this.form.value.price,
      id: this.id
    };

    this.productServ.updateById(this.product).subscribe(res => {
      this.submitted = false;
      this._router.navigate(['/admin', 'dashboard'])
    })
  }
}
