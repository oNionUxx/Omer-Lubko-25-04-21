import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'temperatureConverter' })
export class TemperatureConverterPipe implements PipeTransform {
  transform(val: number, params: string): number {
    const fTemp = val;
    const cTemp = ((val - 32) * 5) / 9;
    return Number((params === 'C' ? cTemp : fTemp).toFixed(1));
  }
}
