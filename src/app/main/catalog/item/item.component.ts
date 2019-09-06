import {Component, Input, OnInit} from '@angular/core';
import {Product} from '../../../core/models/product.model';
import {CartService} from '../../../core/services/cart.service';

@Component({
  selector: 'app-catalog-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.scss']
})
export class ItemComponent implements OnInit {

  @Input() product: Product;

  constructor(public cartService: CartService) { }

  ngOnInit() {
  }

}
