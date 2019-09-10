import {Component, Input, OnInit} from '@angular/core';
import {Product} from '../../core/models/product.model';

@Component({
  selector: 'app-product-image',
  templateUrl: './product-image.component.html',
  styleUrls: ['./product-image.component.scss']
})
export class ProductImageComponent implements OnInit {

  @Input() product: Product;
  @Input() optionId: number;

  constructor() { }

  ngOnInit() {
  }

}
