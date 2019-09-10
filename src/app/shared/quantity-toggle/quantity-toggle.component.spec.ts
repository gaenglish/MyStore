import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QuantityToggleComponent } from './quantity-toggle.component';

describe('QuantityToggleComponent', () => {
  let component: QuantityToggleComponent;
  let fixture: ComponentFixture<QuantityToggleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QuantityToggleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuantityToggleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
