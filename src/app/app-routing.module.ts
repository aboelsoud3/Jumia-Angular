import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CustomerListComponent } from './customer-list/customer-list.component';
import { CustomerAddComponent } from './customer-add/customer-add.component';
import { CustomerEditComponent } from './customer-edit/customer-edit.component';
import { CustomerDetailsComponent } from './customer-details/customer-details.component';

const routes: Routes = [
  {
    path:'customers',
    component:CustomerListComponent,
    data:{title:'List of customers'}
  },
  {
    path:'customer-add',
    component:CustomerAddComponent,
    data:{title:'Add new customer'}
  },
  {
    path:'customer-edit/:id',
    component:CustomerEditComponent,
    data:{title:'Edit customer'}
  },
  {
    path:'customer-details/:id',
    component:CustomerDetailsComponent,
    data:{title:'Customer details'}
  },
  { path: '',
    redirectTo: '/customers',
    pathMatch: 'full'
  }      
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
