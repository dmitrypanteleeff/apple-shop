import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ProductService } from 'src/app/shared/product.service';

@Component({
  selector: 'app-add-page',
  templateUrl: './add-page.component.html',
  styleUrls: ['./add-page.component.scss']
})
export class AddPageComponent implements OnInit {

  form: FormGroup;
  submitted: Boolean = false;

  constructor(
    private _productService: ProductService,
    private _router: Router
  ) {
    this.form = new FormGroup({
      type: new FormControl(null,Validators.required),
      title: new FormControl(null,Validators.required),
      photo: new FormControl(null,Validators.required),
      info: new FormControl(null,Validators.required),
      price: new FormControl(null, Validators.required)
    })
   }

  ngOnInit(): void {
  }

  submit() {
    if (this.form.invalid) {
      return;
    }

    this.submitted = true;

    const product = {
      type: this.form.value.type,
      title: this.form.value.title,
      photo: this.form.value.photo,
      info: this.form.value.info,
      price: this.form.value.price,
      date: new Date()
    }

    this._productService.create(product).subscribe(res => {
      this.form.reset();
      this.submitted = false;
      this._router.navigate(['/']);
    } );
  }

}
