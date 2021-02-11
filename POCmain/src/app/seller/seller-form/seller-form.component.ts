import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { SellerData } from '../registrationFields';
import { atLeastOneDealtypeReq } from '../atLeastOneDealtypeRequired';

@Component({
  selector: 'app-seller-form',
  templateUrl: './seller-form.component.html',
  styleUrls: ['./seller-form.component.scss'],
})
export class SellerFormComponent implements OnInit {
  Id: number = 1;
  updateId?: number;
  data?: SellerData;
  officesList: string[] = ['JP', 'UK', 'US', 'FR', 'AU', 'IT'];
  currenciesList: string[] = ['USD', 'GBR', 'EUR'];
  @Output() send: EventEmitter<SellerData> = new EventEmitter();

  constructor(private fb: FormBuilder) {}

  seller_RegistrationForm = this.fb.group(
    {
      seller_Name: ['', [Validators.required]],
      currencies: ['', [Validators.required]],
      offices: ['', [Validators.required]],
      dealtype: this.fb.group({
        bidded: [],
        guaranteed: [],
      }),
      contact_Name: [],
      email: [
        '',
        Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$'),
      ],
    },
    { validators: atLeastOneDealtypeReq }
  );

 

  //to get the controls
  get registrationFormControl() {
    return this.seller_RegistrationForm.controls;
  }

  ngOnInit(): void {}

  // on update click set form data
  setFormData = (x: SellerData) => {
    this.updateId = x.registrtion_Id;
    this.seller_RegistrationForm.patchValue({
      seller_Name: x.seller_Name,
      currencies: x.currencies,
      offices: x.offices,
      dealtype: {
        bidded: x.bidded == 'YES' ? true : false,
        guaranteed: x.guaranteed == 'YES' ? true : false,
      },
      contact_Name: x.contact_Name,
      email: x.email,
    });
  };

  //save record
  save = () => {

    if (this.seller_RegistrationForm.valid) {
      this.data = {
        registrtion_Id: this.updateId == undefined ? this.Id : this.updateId,
        seller_Name: this.registrationFormControl.seller_Name.value,
        currencies: this.registrationFormControl.currencies.value,
        offices: this.registrationFormControl.offices.value,
        bidded: this.registrationFormControl.dealtype.value.bidded
          ? 'YES'
          : 'NO',
        guaranteed: this.registrationFormControl.dealtype.value.guaranteed
          ? 'YES'
          : 'NO',
        contact_Name: this.registrationFormControl.contact_Name.value,
        email: this.registrationFormControl.email.value,
      };

      // while updating ID should be constant
      if (!this.updateId) {
        this.Id++;
      }

      //emit event and pass data to the table i.e seller-list component
      this.send.emit(this.data);

      //set those field undefined
      this.data = undefined;
      this.updateId = undefined;
    }
  };
}
