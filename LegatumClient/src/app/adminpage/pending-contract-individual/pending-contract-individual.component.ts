import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { Contract } from '../../models/contract/contract.interface';


@Component({
  selector: 'app-pending-contract-individual',
  templateUrl: './pending-contract-individual.component.html',
  styleUrls: ['./pending-contract-individual.component.css']
})
export class PendingContractIndividualComponent implements OnInit {

  @Input() pendingContract: Contract;

  constructor() { }

  @Output() onCreateFormClick = new EventEmitter();

  handleCreateFormClick() {
    this.onCreateFormClick.emit();
    console.log('create form was clicked');
  }

  // observable
  ngOnInit() {
  }

}
