import { Component, OnInit } from '@angular/core';
import {CartService} from '../../core/services/cart.service';

@Component({
  selector: 'app-empty-cart',
  templateUrl: './empty-cart.component.html',
  styleUrls: ['./empty-cart.component.css']
})
export class EmptyCartComponent implements OnInit {

  constructor(public cart: CartService) { }

  ngOnInit() {
  }

}
