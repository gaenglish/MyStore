import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {CartService} from '../../core/services/cart.service';
import {Observable} from 'rxjs';
import {CartItem} from '../../core/models/cart.model';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  @Output() toggleCart = new EventEmitter();

  cart$: Observable<CartItem[]> = this.cartService.cartItems$;

  constructor(public cartService: CartService) { }

  ngOnInit() {
  }

}
