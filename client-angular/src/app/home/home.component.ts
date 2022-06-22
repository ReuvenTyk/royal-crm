import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  title = 'Welcome';
  getTitleClass(): string {
    return this.success ? 'text-info' : 'text-danger';
  }
  success = true;
  labels = ['Customers', 'Products', 'Orders'];

  constructor() {}

  ngOnInit(): void {}
}
