import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-contract-preview',
  templateUrl: './contract-preview.component.html',
  styleUrls: ['./contract-preview.component.css']
})
export class ContractPreviewComponent implements OnInit {
  @Input() contract: any;
  constructor() { }

  ngOnInit() {
    console.log('contract preview: ', this.contract);
  }

}
