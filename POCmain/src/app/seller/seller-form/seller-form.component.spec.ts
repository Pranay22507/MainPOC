import { ComponentFixture, TestBed } from '@angular/core/testing';
import {
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { SellerFormComponent } from './seller-form.component';
import { MaterialModule } from '../../material/material.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SellerData } from '../registrationFields';
import { SellerListComponent } from '../seller-list/seller-list.component';
// import { atLeastOneDealtypeReq } from '../atLeastOneDealtypeRequired';

describe('SellerFormComponent', () => {
  let component: SellerFormComponent;
  let fixture: ComponentFixture<SellerFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule,
        FormsModule,
        HttpClientTestingModule,
        RouterTestingModule,
        MaterialModule,
        BrowserAnimationsModule,
      ],
      declarations: [SellerFormComponent,SellerListComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SellerFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('ID for Registration form start with 1 initialized', () => {
    expect(component.Id).toEqual(1);
  });
  it('ID for Updation Record', () => {
    expect(component.updateId).toBeFalsy();
  });
  it('Seller Data Initialized', () => {
    expect(component.data).toBeFalsy();
  });
  it('Offices List', () => {
    expect(component.officesList).toEqual(['JP', 'UK', 'US', 'FR', 'AU', 'IT']);
  });
  it('Offices List', () => {
    expect(component.currenciesList).toEqual(['USD', 'GBR', 'EUR']);
  });

  it('Seller Form invalid when Empty', () => {
    expect(component.registrationFormControl.valid).toBeFalsy();
  });

  it('Seller Name field validity', () => {
    const seller_name = component.registrationFormControl.seller_Name;
    expect(seller_name.valid).toBeFalsy();
    seller_name.setValue('');
    expect(seller_name.hasError('required')).toBeTruthy();
  });

  it('Currencies field validity', () => {
    const currencies = component.registrationFormControl.currencies;
    expect(currencies.valid).toBeFalsy();
    currencies.setValue('');
    expect(currencies.hasError('required')).toBeTruthy();
  });

  it('Offices field validity', () => {
    const offices = component.registrationFormControl.offices;
    expect(offices.valid).toBeFalsy();
    offices.setValue('');
    expect(offices.hasError('required')).toBeTruthy();
  });

  it('Seller Form valid when filled', () => {
    const seller_name = component.registrationFormControl.seller_Name;
    seller_name.setValue('John Wick');
    const currencies = component.registrationFormControl.currencies;
    currencies.setValue(['USD', 'GBR', 'EUR']);
    const offices = component.registrationFormControl.offices;
    offices.setValue(['JP', 'UK', 'US', 'FR', 'AU', 'IT']);
    component.registrationFormControl.dealtype.value.bidded = true;
    component.registrationFormControl.dealtype.value.guaranteed = false;

    const contact_Name = component.registrationFormControl.contact_Name;
    contact_Name.setValue('John Wick');
    const email = component.registrationFormControl.email;
    email.setValue('john123@gmail.com');
    expect(email.valid).toBeTruthy();

    expect(component.registrationFormControl.invalid).toBeFalsy();
  });


  it('should emit when clicked (pass data to seller List)', () => {
    let data = {
      registrtion_Id: 101,
      seller_Name: 'John',
      currencies: ['USD', 'GBR', 'EUR'],
      offices: ['JP', 'UK', 'US', 'FR', 'AU', 'IT'],
      bidded: 'true',
      guaranteed: 'false',
      contact_Name: 'shaushank',
      email: 'john123@gmail.com',
    };

    component.send.subscribe((event:SellerData) => {
      data = event;
    });
    component.save();
    expect(data).toBe(data);
  });
});


