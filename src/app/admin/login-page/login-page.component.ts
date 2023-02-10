import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators
} from '@angular/forms';
import { AuthService } from 'src/app/shared/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent implements OnInit {
  form: FormGroup;
  submitted: Boolean = false;

  constructor(
    private _router: Router,
    private _formBuilder: FormBuilder,
    public auth: AuthService
  ) {
    this.form = this._formBuilder.group({
      email: new FormControl(null, [Validators.required, Validators.email]), // пустое значение, обязательное, проверка
      pass: new FormControl(null, [Validators.required, Validators.minLength(6)]), // пустое значение, обязательное, проверка
    })
  }

  ngOnInit(): void {
    console.log(this.form)
  }

  submit() {
    if (this.form.invalid) {
      return;
    }

    this.submitted = true;

    const user = {
      email: this.form.value.email,
      password: this.form.value.pass,
      returnSecureToken: true
    }

    this.auth.login(user).subscribe((res) => {
      this.form.reset();
      this._router.navigate(['/admin', 'dashboard']);
      this.submitted = false;
      console.log(res)
    }, (error) => {
      this.submitted = false;
      console.log(error)
    })

  }
  get Email(){
    return this.form.get("email");
  }

}
