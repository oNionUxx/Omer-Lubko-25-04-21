/* Modules */
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { SpinnerComponent } from './spinner/spinner.component';

import { TemperatureConverterPipe } from './pipes/temperature-converter.pipe';

@NgModule({
  imports: [CommonModule],
  declarations: [TemperatureConverterPipe, SpinnerComponent],
  exports: [CommonModule, HttpClientModule, FormsModule, ReactiveFormsModule, TemperatureConverterPipe, SpinnerComponent],
})
export class SharedModule {}
