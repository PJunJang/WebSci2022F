import { Component, OnInit } from '@angular/core';
declare var paulFunc: any;
declare var putFunc: any;
declare var deleteFunc: any;

@Component({
  selector: 'app-database',
  templateUrl: './database.component.html',
  styleUrls: ['./database.component.css']
})
export class DatabaseComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  onClick() {
    // handle get "db/:index"
    paulFunc();
  }

  putReq() {
    // put "db/:index"
    putFunc(false);
  }
  putReqBatch() { // Bulk update
    // put "db/:index"
    putFunc(true);
  }

  deleteReq(){
    deleteFunc(false);
  }

  deleteReqBatch() { // Bulk delete
    // put "db/:index"
    deleteFunc(true);
  }
}
