import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-quantity-toggle',
  templateUrl: './quantity-toggle.component.html',
  styleUrls: ['./quantity-toggle.component.css']
})
export class QuantityToggleComponent implements OnInit {

  qty = 1;
  @Output() quantity = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }

}
