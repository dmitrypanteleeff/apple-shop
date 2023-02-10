import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/shared/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-layout',
  templateUrl: './admin-layout.component.html',
  styleUrls: ['./admin-layout.component.scss']
})
export class AdminLayoutComponent implements OnInit {

  constructor(
    public _auth: AuthService,
    private _router: Router,
  ) { }

  ngOnInit(): void {
  }

  logout($event: MouseEvent) {
    $event.preventDefault();
    this._auth.logout();
    this._router.navigate(['/admin','login']);

  }

}
