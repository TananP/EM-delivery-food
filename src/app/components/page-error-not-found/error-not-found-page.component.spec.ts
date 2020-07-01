import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ErrorNotFoundPageComponent } from './error-not-found-page.component';

describe('ErrorNotFoundPageComponent', () => {
  let component: ErrorNotFoundPageComponent;
  let fixture: ComponentFixture<ErrorNotFoundPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ErrorNotFoundPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ErrorNotFoundPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
