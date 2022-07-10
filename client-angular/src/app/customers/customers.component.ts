import { Component, NgModule, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { required } from 'joi';
import { environment } from 'src/environments/environment';
import { ApiService } from '../core/api.service';
import { Customer, CustomerSort, FilePath, sortColumn } from '../shared/types';

@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.scss'],
})
export class CustomersComponent implements OnInit {
  customers!: Array<Customer>;
  searchFieldValue!: string;
  searchTerm!: string;
  tableSort!: CustomerSort;
  showForm = false;

  customerForm = new FormGroup({
    name: new FormControl('', { validators: Validators.required }),
    email: new FormControl('', {
      validators: [Validators.required, Validators.email],
    }),
    phone: new FormControl('', { validators: Validators.required }),
    country: new FormControl('', { validators: Validators.required }),
  });

  constructor(private apiService: ApiService) {}

  onSubmit() {}

  toggleForm() {
    this.showForm = !this.showForm;
  }

  ngOnInit(): void {
    this.getCustomers();

    this.tableSort = {
      column: 'name',
      dirAsc: true,
    };
  }

  getCustomers() {
    this.apiService.getCustomersList().subscribe({
      next: (data: Array<Customer>) => {
        this.customers = data;
      },
      error: (err) => console.error(err),
      // complete: () => console.log('complete'),
    });
  }

  exportCustomersData() {
    this.apiService.exportCustomers().subscribe({
      next: (data: FilePath) => {
        window.open(`${environment.serverUrl}/${data.name}`);
      },
      error: (err) => console.error(err),
    });
  }

  findCustomer(event: KeyboardEvent) {
    const value = this.searchFieldValue;
    if (event.key === 'Enter' && value.length >= 3) {
      this.apiService.findCustomer(value).subscribe({
        next: (data: Array<Customer>) => {
          this.customers = data;
        },
        error: (err) => console.error(err),
      });
    }
  }

  clearSearch() {
    this.searchFieldValue = '';
    this.getCustomers();
  }

  customersNum(): number {
    return this.customers ? this.customers.length : 0;
  }

  sortCustomers(column: sortColumn) {
    if (this.tableSort.column === column) {
      this.tableSort.dirAsc = !this.tableSort.dirAsc;
    } else {
      this.tableSort.column = column;
      this.tableSort.dirAsc = true;
    }

    const direction = this.tableSort.dirAsc ? 'ASC' : 'DESC';

    this.apiService.getSortedCustomers(column, direction).subscribe({
      next: (data: Array<Customer>) => {
        this.customers = data;
      },
      error: (err) => console.error(err),
    });
  }

  displaySort(column: sortColumn): string {
    if (this.tableSort.column === column) {
      return this.tableSort.dirAsc ? 'bi-chevron-up' : 'bi-chevron-down';
    } else {
      return 'bi-chevron-expand';
    }
  }
}
