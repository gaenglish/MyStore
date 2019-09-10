import {Component, Input, OnInit} from '@angular/core';
import {CartItem} from '../../core/models/cart.model';
import {ProductService} from '../../core/services/products.service';

@Component({
  selector: 'app-cart-item',
  templateUrl: './cart-item.component.html',
  styleUrls: ['./cart-item.component.css']
})
export class CartItemComponent implements OnInit {

  @Input() cartItem: CartItem;

  constructor(public productService: ProductService) { }

  ngOnInit() {
  }

}
