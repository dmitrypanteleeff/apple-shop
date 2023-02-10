import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private _http: HttpClient) { }

  login( User: {email: String, password: String, returnSecureToken: Boolean} ) {
    return this._http.post(`https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${environment.apiKey}`, User)
    .pipe(tap(this.setToken))
  }

  private setToken(response: any) {
    if (response) {
      const expData = new Date(new Date().getTime() + +response.expiresIn * 1000);
      localStorage.setItem('firebase-token-exp', expData.toString());
      localStorage.setItem('firebase-token', response.idToken);
    }
    else {
      localStorage.clear();
    }

  }

  get token() {
    const expData = localStorage.getItem('firebase-token-exp');
    if ((expData) && (+(new Date) > +expData)) {
      this.logout();
      return null;
    }
    return localStorage.getItem('firebase-token');
  }

  logout() {
    this.setToken(null)
  }

  isAuthenicated() {
    return !!this.token  // если в токене есть какая-то информация, т.е. непустое значение, то преобразовываем к величине Boolean и возвращаем значение true, Если токен равен null, то преобразовываем к величине Boolean и получаем значение false
  }
}
