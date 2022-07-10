import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'phone',
})
export class PhonePipe implements PipeTransform {
  transform(value: string): string {
    let number = [];
    let result = '';
    if (value.includes('-')) {
      number = value.split('-');
      result = `(${number[0]}) ${number[1]}`;
    }
    return result;
  }
}
