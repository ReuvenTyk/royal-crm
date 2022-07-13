import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'phone',
})
export class PhonePipe implements PipeTransform {
  transform(value?: string): string {
    if (!value) {
      return '';
    }
    if (!value.includes('-')) {
      if (value.length === 9) {
        return `(${value.substring(0, 2)}) ${value.substring(2, 9)}`;
      }
      if (value.length === 10) {
        return `(${value.substring(0, 3)}) ${value.substring(3, 10)}`;
      }
    }
    const number = value.split('-');
    return `(${number[0]}) ${number[1]}`;
  }
}
