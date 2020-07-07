import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HistoryInformationComponent } from './history-information.component';

describe('HistoryInformationComponent', () => {
  let component: HistoryInformationComponent;
  let fixture: ComponentFixture<HistoryInformationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HistoryInformationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HistoryInformationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
