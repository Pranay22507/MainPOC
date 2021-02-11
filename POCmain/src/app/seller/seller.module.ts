import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SellerListComponent } from './seller-list/seller-list.component';
import { SellerFormComponent } from './seller-form/seller-form.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../material/material.module';
const sellerComponent = [SellerListComponent, SellerFormComponent];
@NgModule({
  declarations: [sellerComponent],
  imports: [
    CommonModule, 
    FormsModule, 
    ReactiveFormsModule, 
    MaterialModule
  ],
  exports: [
    sellerComponent,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
  ],
})
export class SellerModule {}
