import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CartDrawerItemComponent } from './cart-drawer-item.component';

describe('CartDrawerItemComponent', () => {
  let component: CartDrawerItemComponent;
  let fixture: ComponentFixture<CartDrawerItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CartDrawerItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CartDrawerItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
