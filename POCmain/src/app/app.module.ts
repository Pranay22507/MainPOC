import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {ToastrModule} from 'ngx-toastr'
import{SellerModule} from '../app/seller/seller.module';
import { MaterialModule } from '../app/material/material.module';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    SellerModule,
    MaterialModule,
    BrowserModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot({
      timeOut:2000,
      positionClass:'toast-top-right',
      preventDuplicates:false,
    })

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
