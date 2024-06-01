import {Component, OnDestroy, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {Subscription} from "rxjs";
import {ProductService} from "../../services/product.service";

@Component({
  selector: 'header-component',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, OnDestroy {
  public filter: string = '';
  private subscriptionFilterSubject: Subscription | null = null;

  constructor(private productService:ProductService ,private router: Router) {

  }

  ngOnInit(): void {
    this.subscriptionFilterSubject = this.productService.filterSubject$.subscribe((params)=>{
      this.filter = params?params:'';
    })

  }

  clearFilter() {
    console.log(this.router.url)
    if (!this.filter && this.router.url.includes('/catalog')) {
      this.router.navigate(['/catalog']);
    }
  }

  ngOnDestroy() {
    this.subscriptionFilterSubject?.unsubscribe();
  }

}
