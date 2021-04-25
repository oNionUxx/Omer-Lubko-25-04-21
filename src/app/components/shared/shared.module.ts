/* Modules */
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { TemperatureConverterPipe } from './pipes/temperature-converter.pipe';

@NgModule({
  imports: [CommonModule],
  declarations: [TemperatureConverterPipe],
  exports: [CommonModule, HttpClientModule, FormsModule, ReactiveFormsModule, TemperatureConverterPipe],
})
export class SharedModule {}
