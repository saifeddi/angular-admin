import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {LoginComponent} from './public/login/login.component';
import {RegisterComponent} from './public/register/register.component';
 import {PublicComponent} from './public/public.component';
import { SecureComponent } from './secure/secure.component';
import { ProfileComponent } from './secure/profile/profile.component';
import { DashboradComponent } from './secure/dashborad/dashborad.component';
import { UsersComponent } from './secure/users/users.component';
import { CreateUserComponent } from './secure/users/create-user/create-user.component';
import { EditUserComponent } from './secure/users/edit-user/edit-user.component';
import { RolesComponent } from './secure/roles/roles.component';
import { RoleCreateComponent } from './secure/roles/role-create/role-create.component';
import { RoleEditComponent } from './secure/roles/role-edit/role-edit.component';
import { ProductsComponent } from './secure/products/products.component';
import { ProductCreateComponent } from './secure/products/product-create/product-create.component';
import { ProductEditComponent } from './secure/products/product-edit/product-edit.component';
import { OrdersComponent } from './secure/orders/orders.component';
 
const routes: Routes = [
  {
    path:'',
    component:SecureComponent ,
    children:[
      {path:'', redirectTo:'/dashboard' , pathMatch:'full' },
      {path:'dashboard',component: DashboradComponent},
      {path:'users',component: UsersComponent},
      {path:'users/create',component: CreateUserComponent},
      {path:'users/:id/edit',component: EditUserComponent},
      {path:'profile',component: ProfileComponent},
      {path:'roles',component: RolesComponent},
      {path:'roles/create',component: RoleCreateComponent},
      {path:'roles/:id/edit',component: RoleEditComponent},
      {path:'products',component: ProductsComponent},
      {path:'products/create',component: ProductCreateComponent},
      {path:'products/:id/edit',component: ProductEditComponent},
      {path:'orders',component: OrdersComponent},
    ]

  },
  {
    path: '',
    component: PublicComponent,
    children: [
      {path: 'login', component: LoginComponent},
      {path: 'register', component: RegisterComponent},
    ]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
