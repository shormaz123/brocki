import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-filters',
  templateUrl: './filters.component.html',
  styleUrls: ['./filters.component.scss']
})
export class FiltersComponent implements OnInit {

  all: boolean;
  used: boolean;
  new: boolean;

  constructor() { }

  ngOnInit() {

    this.all = true;
  }

  allButton() {
    this.all = true;
    this.new = false;
    this.used = false;

  }

  newButton() {
    this.all = false;
    this.new = true;
    this.used = false;

  }

  usedButton() {
    this.all = false;
    this.new = false;
    this.used = true;

  }

}
