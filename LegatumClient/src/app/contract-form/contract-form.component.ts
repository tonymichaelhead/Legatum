import { Component, OnInit } from '@angular/core';
import { NgModel } from '@angular/forms';

@Component({
  selector: 'app-contract-form',
  templateUrl: './contract-form.component.html',
  styleUrls: ['./contract-form.component.css']
})
export class ContractFormComponent implements OnInit {

  text: string = '';

  constructor() { }

  handleClickOnReview() {
    console.log('Details: ', this.text)
  }

  ngOnInit() {
  }

}
