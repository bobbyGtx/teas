import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {OrderComponent} from "./order.component";


const routes: Routes = [
  {path: '', component: OrderComponent},//Каталог
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OrderRoutingModule { }
