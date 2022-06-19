import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss'],
})
export class ButtonComponent implements OnInit {
  second = 'CLICK';
  constructor() {}
  buttonSize = 'size';
  ngOnInit(): void {}

  buttonClick() {
    console.log('CLICKED ME');
  }
}
