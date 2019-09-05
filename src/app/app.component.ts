import { Component } from '@angular/core';
import {ProductService} from './core/services/products.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  products$ = this.productService.products$;

  constructor(public productService: ProductService) {}

}
