import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PendingContractsComponent } from './pending-contracts.component';

describe('PendingContractsComponent', () => {
  let component: PendingContractsComponent;
  let fixture: ComponentFixture<PendingContractsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PendingContractsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PendingContractsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
