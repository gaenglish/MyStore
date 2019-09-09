import {Component, Input, OnInit} from '@angular/core';
import {Product} from '../../core/models/product.model';
import {CartService} from '../../core/services/cart.service';

@Component({
  selector: 'app-add-to-cart',
  templateUrl: './add-to-cart.component.html',
  styleUrls: ['./add-to-cart.component.scss']
})
export class AddToCartComponent implements OnInit {

  @Input() product: Product;
  optionId = null;

  constructor(public cart: CartService) { }

  ngOnInit() {
  }

}
