import { Component, OnInit } from '@angular/core';
import {ProductService} from '../../core/services/products.service';
import {CartService} from '../../core/services/cart.service';

@Component({
  selector: 'app-catalog',
  templateUrl: './catalog.component.html',
  styleUrls: ['./catalog.component.scss']
})
export class CatalogComponent implements OnInit {

  products$ = this.productService.products$;

  constructor(private productService: ProductService, public cartService: CartService) { }

  ngOnInit() {
  }

}
