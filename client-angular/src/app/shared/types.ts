export interface Customer {
  id: number;
  name: string;
  email: string;
  phone: string;
  countryId: number;
  country_name: string;
  country_code: string;
}

export interface FilePath {
  name: string;
}

export type sortDirection = 'ASC' | 'DESC' | 'Default';
export type sortColumn = 'name' | 'email' | 'country_name';

export interface CustomerSort {
  name: sortDirection;
  email: sortDirection;
  country_name: sortDirection;
}
