import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ProductCardComponent} from "./components/product-card/product-card.component";
import {ShortPipe} from "./pipes/short.pipe";
import {RouterModule} from "@angular/router";



@NgModule({
  declarations: [
    ProductCardComponent,
    ShortPipe,
  ],
  imports: [
    CommonModule,
    RouterModule
  ],
  exports:[
    ProductCardComponent,
    ShortPipe,
  ]
})
export class SharedModule { }
