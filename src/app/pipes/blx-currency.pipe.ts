import { Pipe, PipeTransform } from '@angular/core';
import {CurrencyPipe} from '@angular/common';

/**
 * Use to convert your blx formatted currency into a readable currency as we use integers for our currency
 * 453454 > 4534.54
 */
@Pipe({
  name: 'blxCurrency'
})
export class BlxCurrencyPipe extends CurrencyPipe implements PipeTransform {
  transform(value: any): string {
    return super.transform(parseFloat(value), 'USD', '');
  }
}
