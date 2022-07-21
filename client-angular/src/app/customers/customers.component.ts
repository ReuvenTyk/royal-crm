import { Component, NgModule, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { required } from 'joi';
import { environment } from 'src/environments/environment';
import { ApiService } from '../core/api.service';
import {
  Country,
  Customer,
  CustomerSort,
  FilePath,
  sortColumn,
} from '../shared/types';

@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.scss'],
})
export class CustomersComponent implements OnInit {
  customers!: Array<Customer>;
  countries!: Array<Country>;
  searchFieldValue!: string;
  searchTerm!: string;
  tableSort!: CustomerSort;
  showForm = false;
  showNotification = false;

  customerForm = new FormGroup({
    name: new FormControl('', { validators: Validators.required }),
    email: new FormControl('', {
      validators: [Validators.required, Validators.email],
    }),
    phone: new FormControl('', { validators: Validators.required }),
    country_id: new FormControl(0, { validators: Validators.required }),
  });

  constructor(private apiService: ApiService) {}

  onSubmit() {
    if (!this.customerForm.valid) {
      return;
    }

    this.apiService.addCustomer(this.customerForm.value).subscribe({
      next: (data: Customer) => {
        this.getCustomers();
        this.showNotification = true;
      },
      error: (err) => console.log(err),
    });
  }

  notificationClose(state: boolean) {
    this.showForm = false;
    this.customerForm.reset();
    this.showNotification = state;
  }

  toggleForm() {
    this.showForm = !this.showForm;
  }

  ngOnInit(): void {
    this.getCustomers();
    this.countriesList();

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

  countriesList() {
    this.apiService.countriesList().subscribe({
      next: (data: Array<Country>) => {
        this.countries = data;
      },
      error: (err) => console.error(err),
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
