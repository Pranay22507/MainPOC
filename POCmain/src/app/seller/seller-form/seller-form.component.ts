import {
  AfterViewInit,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
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
  @ViewChild('cancelbtn') formReset!: ElementRef;
  seller_RegistrationForm: any;
  constructor(private fb: FormBuilder) {}
  
  fillFormDate() {
    this.seller_RegistrationForm = this.fb.group(
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
  }

  //to get the controls
  get registrationFormControl() {
    return this.seller_RegistrationForm.controls;
  }

  ngOnInit(): void {
    this.fillFormDate();
  }


  //save record
  save = () => {
    // console.log(this.formReset.nativeElement);

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
      this.fillFormDate();
      //set those field undefined

      this.data = undefined;
      this.updateId = undefined;
    }
  };

  submitForm(formDirective): void {
    this.save();
    formDirective.resetForm();
    this.seller_RegistrationForm.reset();
  }
}
