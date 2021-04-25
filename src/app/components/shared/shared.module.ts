import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

import { TemperatureConverterPipe } from './pipes/temperature-converter.pipe';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  imports: [CommonModule],
  declarations: [TemperatureConverterPipe],
  exports: [CommonModule, HttpClientModule, FormsModule, ReactiveFormsModule, TemperatureConverterPipe],
})
export class SharedModule {}
