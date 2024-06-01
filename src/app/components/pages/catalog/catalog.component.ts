import {Component, OnDestroy, OnInit} from '@angular/core';
import {ProductType} from "../../../types/product.type";
import {ProductService} from "../../../services/product.service";
import {Subscription} from "rxjs";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'catalog-component',
  templateUrl: './catalog.component.html',
  styleUrls: ['./catalog.component.scss']
})
export class CatalogComponent implements OnInit, OnDestroy {
  public products: ProductType[] = [];
  public loaderShow: boolean = false;
  private subscriptionFilter: Subscription | null = null;
  private subscriptionFilterSubject: Subscription | null = null;
  public filter: boolean = false;
  public filterParam: string = '';
  private subscriptionParams: Subscription | null = null;


  constructor(private productService: ProductService, private router: Router, private activatedRoute: ActivatedRoute) {

  }

  ngOnInit(): void {
    //Подписка на Subject

    this.productService.filterSubject$.subscribe((params) => {
      this.loaderShow = true;
      this.filterParam=params?params:'';
      this.subscriptionFilter = this.productService.getProducts(this.filterParam).subscribe({
        next: data => {
          this.products = data;
          this.productService.products = data;
          this.loaderShow = false;
          if (this.filterParam) this.filter = true; else this.filter = false;
        },
        error: error => {
          console.log(error);
          this.loaderShow = false;
          this.router.navigate(['/']).then();
        }
      });
    });

    //Подписка на получение QueryParams в URL
    this.subscriptionParams = this.activatedRoute.queryParams.subscribe((params) => {
      if (params['search']) {
        this.filterParam = params['search'];
        this.productService.filterSubject$.next(this.filterParam);
      } else {
        this.productService.filterSubject$.next(null);
      }
    });
  }

  ngOnDestroy() {
    this.subscriptionParams?.unsubscribe();
    this.subscriptionFilter?.unsubscribe();
    this.subscriptionFilterSubject?.unsubscribe();
  }

}
