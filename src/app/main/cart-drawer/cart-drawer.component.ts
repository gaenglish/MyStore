import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {ProductService} from '../../core/services/products.service';
import {CartService} from '../../core/services/cart.service';
import {transition, trigger, useAnimation} from '@angular/animations';
import {fadeIn} from '../../core/util/animations';

@Component({
  selector: 'app-cart-drawer',
  templateUrl: './cart-drawer.component.html',
  styleUrls: ['./cart-drawer.component.scss'],
  animations: [
    trigger('fadeIn', [transition('* => *', useAnimation(fadeIn))])
  ]
})
export class CartDrawerComponent implements OnInit {
  productDictionary$ = this.productService.productDictionary$;
  cart$ = this.cartService.cart$;

  @Output() drawerToggle = new EventEmitter();

  constructor(private cartService: CartService, private productService: ProductService) { }

  ngOnInit() {
  }

}
