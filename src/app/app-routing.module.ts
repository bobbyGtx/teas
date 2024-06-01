import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {MainComponent} from "./views/main/main.component";

import {ProductComponent} from "./views/products/product/product.component";
import {CatalogComponent} from "./views/products/catalog/catalog.component";

const routes: Routes = [
  {path: '**', redirectTo:''},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
