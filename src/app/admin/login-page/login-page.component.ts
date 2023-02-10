import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup,  Validators } from '@angular/forms';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent implements OnInit {
  form: FormGroup;
  submited: Boolean = false;

  constructor(private _formBuilder: FormBuilder) {
    this.form = this._formBuilder.group({
      email: new FormControl(null, [Validators.required, Validators.email]), // пустое значение, обязательное, проверка
      pass: new FormControl(null, [Validators.required, Validators.minLength(6)]), // пустое значение, обязательное, проверка
    })
  }

  ngOnInit(): void {
    console.log(this.form)
  }

  submit() {
    this.submited = true;
  }
  get Email(){
    return this.form.get("email");
  }

}
