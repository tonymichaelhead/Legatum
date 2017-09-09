import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeployContractsComponent } from './deploy-contracts.component';

describe('DeployContractsComponent', () => {
  let component: DeployContractsComponent;
  let fixture: ComponentFixture<DeployContractsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeployContractsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeployContractsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
