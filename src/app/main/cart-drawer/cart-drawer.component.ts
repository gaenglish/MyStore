import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {ProductService} from '../../core/services/products.service';
import {CartService} from '../../core/services/cart.service';
import {animate, state, style, transition, trigger, useAnimation} from '@angular/animations';
import {fadeIn} from '../../core/util/animations';

@Component({
  selector: 'app-cart-drawer',
  templateUrl: './cart-drawer.component.html',
  styleUrls: ['./cart-drawer.component.scss'],
  animations: [
    // the fade-in/fade-out animation.
    trigger('fade', [

      // the "in" style determines the "resting" state of the element when it is visible.
      state('in', style({opacity: 1})),

      // fade in when created. this could also be written as transition('void => *')
      transition(':enter', [
        style({opacity: 0}),
        animate('600ms ease-in' )
      ]),

      // fade out when destroyed. this could also be written as transition('void => *')
      transition(':leave',
        animate('350ms ease-in-out', style({opacity: 0, height: 0})))
    ])
  ]
})
export class CartDrawerComponent implements OnInit {

  productDictionary$ = this.productService.productDictionary$;

  @Output() drawerToggle = new EventEmitter();

  constructor(public cart: CartService, private productService: ProductService) { }

  ngOnInit() {
  }

}
