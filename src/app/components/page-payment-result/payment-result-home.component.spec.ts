import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PaymentResultHomeComponent } from './payment-result-home.component';

describe('PaymentResultHomeComponent', () => {
  let component: PaymentResultHomeComponent;
  let fixture: ComponentFixture<PaymentResultHomeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PaymentResultHomeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PaymentResultHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
