import { Component, OnInit, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-my-contracts',
  templateUrl: './my-contracts.component.html',
  styleUrls: ['./my-contracts.component.css']
})
export class MyContractsComponent implements OnInit {

  @Output() onCreateFormClick = new EventEmitter();

  constructor() { }

  handleCreateFormClick() {
    this.onCreateFormClick.emit();
    console.log('create form was clicked')
  }

  ngOnInit() {
  }

}
