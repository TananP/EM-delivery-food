import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReserveHomeComponent } from './reserve-home.component';

describe('ReserveHomeComponent', () => {
  let component: ReserveHomeComponent;
  let fixture: ComponentFixture<ReserveHomeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReserveHomeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReserveHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
