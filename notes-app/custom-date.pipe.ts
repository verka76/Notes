import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'customDate'
})
export class CustomDatePipe implements PipeTransform {
  transform(value: Date | string): string {
    const date = new Date(value);
    const options: Intl.DateTimeFormatOptions = {
      year: '2-digit',
      month: 'numeric',
      day: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
      hour12: true
    };

    const formattedDate = date.toLocaleString('en-US', options);
    
    // Замените символы-разделители
    return formattedDate.replace('/', '.').replace('/', '.').replace(',', '');
  }
}
