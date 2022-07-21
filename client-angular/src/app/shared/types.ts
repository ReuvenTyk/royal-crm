import { DecimalPipe } from '@angular/common';

export interface Customer {
  id: number;
  name: string;
  email: string;
  phone: string;
  countryId: number;
  country_name: string;
  country_code: string;
}

export interface AddCustomer {
  name?: string | null;
  email?: string | null;
  phone?: string | null;
  countryId?: number | null;
}

export interface Country {
  id: string;
  name: string;
  country_code: string;
}

export interface FilePath {
  name: string;
}

export type sortColumn = 'name' | 'email' | 'country_name';

export interface CustomerSort {
  column: sortColumn;
  dirAsc: boolean;
}

export type themeValues = 'light-theme' | 'dark-theme';

export interface Theme {
  title: string;
  value: themeValues;
}

export interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  image: string | null;
}

export interface Login {
  email?: string | null;
  password?: string | null;
}

export interface User {
  token?: string | null;
  id: number;
  first_name: string;
  last_name: string;
  email: string;
}

export interface RegisterUser {
  first_name?: string | null;
  last_name?: string | null;
  email?: string | null;
  password?: string | null;
}
