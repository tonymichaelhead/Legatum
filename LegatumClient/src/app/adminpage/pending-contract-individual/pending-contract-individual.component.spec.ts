import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PendingContractIndividualComponent } from './pending-contract-individual.component';

describe('PendingContractIndividualComponent', () => {
  let component: PendingContractIndividualComponent;
  let fixture: ComponentFixture<PendingContractIndividualComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PendingContractIndividualComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PendingContractIndividualComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
