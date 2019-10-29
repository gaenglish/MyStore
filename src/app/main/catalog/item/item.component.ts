import {Component, Input, OnInit} from '@angular/core';
import {Product} from '../../../core/models/product.model';
import {CartService} from '../../../core/services/cart.service';
import {ProductDetailComponent} from '../../product-detail/product-detail.component';
import {DialogPosition, MatDialog} from '@angular/material';

@Component({
  selector: 'app-catalog-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.scss']
})
export class ItemComponent implements OnInit {

  @Input() product: Product;

  constructor(public cartService: CartService, public dialog: MatDialog) { }

  ngOnInit() {
  }

  openDialog() {
    const dialogRef = this.dialog.open(ProductDetailComponent, {
      panelClass: 'product-detail-dialog'
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }
}
