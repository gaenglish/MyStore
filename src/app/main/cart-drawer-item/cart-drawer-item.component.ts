import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {CartItem} from '../../core/models/cart.model';
import {Product} from '../../core/models/product.model';
import {CartService} from '../../core/services/cart.service';

@Component({
  selector: 'app-cart-drawer-item',
  templateUrl: './cart-drawer-item.component.html',
  styleUrls: ['./cart-drawer-item.component.scss']
})
export class CartDrawerItemComponent implements OnInit {

  @Input() cartItem: CartItem;
  @Input() product: Product;

  constructor(public cartService: CartService) { }

  ngOnInit() {
  }

}
