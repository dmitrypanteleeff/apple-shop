import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { AdminLayoutComponent } from './shared/admin-layout/admin-layout.component';
import { LoginPageComponent } from './login-page/login-page.component';
import { AddPageComponent } from './add-page/add-page.component';
import { DashboardPageComponent } from './dashboard-page/dashboard-page.component';
import { EditPageComponent } from './edit-page/edit-page.component';
import { OrdersPageComponent } from './orders-page/orders-page.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthGuard } from '../shared/auth.guard';
import { QuillModule } from 'ngx-quill'
import { SearchPipe } from '../shared/search.pipe';

@NgModule({
  declarations: [
    AdminLayoutComponent,
    LoginPageComponent,
    AddPageComponent,
    DashboardPageComponent,
    EditPageComponent,
    OrdersPageComponent,
    SearchPipe
  ],
  imports: [
    QuillModule.forRoot(),
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    RouterModule.forChild([
      {
        path: '',
        component: AdminLayoutComponent,
        children: [
          {
            path: '',
            redirectTo: '/admin/login',
            pathMatch: 'full'
          },
          {
            path: 'add',
            component: AddPageComponent,
            canActivate: [AuthGuard]
          },
          {
            path: 'login',
            component: LoginPageComponent
          },
          {
            path: 'dashboard',
            component: DashboardPageComponent,
            canActivate: [AuthGuard]

          },
          {
            path: 'product/:id/edit',
            component: EditPageComponent,
            canActivate: [AuthGuard]

          },
          {
            path: 'orders',
            component: OrdersPageComponent,
            canActivate: [AuthGuard]
          }
        ]
      }
    ])
  ],
  exports: [

  ]
})
export class AdminModule { }
