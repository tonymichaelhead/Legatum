import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { MdSidenavModule } from '@angular/material';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  
  constructor(private router: Router ) { }

  ngOnInit() {
  }

}
