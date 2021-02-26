import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { MaterialModule } from '../../material/material.module';
import { ToastrModule } from 'ngx-toastr';
import { SellerListComponent } from './seller-list.component';
import { ToastrService } from 'ngx-toastr';
import { SellerFormComponent } from '../seller-form/seller-form.component';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ConfirmationDialogComponent } from '../confirmation-dialog/confirmation-dialog.component';
import { of } from 'rxjs';
describe('SellerListComponent', () => {
  let component: SellerListComponent;
  let fixture: ComponentFixture<SellerListComponent>;
  let fixtureComponent2: ComponentFixture<ConfirmationDialogComponent>;
  let service: ToastrService;
  let dialog: MatDialog;
  let dialogComponent: ConfirmationDialogComponent;
  let instanceComponent2: any;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule,
        FormsModule,
        HttpClientTestingModule,
        RouterTestingModule,
        MaterialModule,
        BrowserAnimationsModule,
        ToastrModule.forRoot(),
      ],
      declarations: [
        SellerListComponent,
        SellerFormComponent,
        ConfirmationDialogComponent,
      ],
      providers: [ToastrService, MatDialog],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SellerListComponent);
    fixtureComponent2 = TestBed.createComponent(ConfirmationDialogComponent);
    service = TestBed.get(ToastrService);
    dialog = TestBed.get(MatDialog);
    component = fixture.componentInstance;
    dialogComponent = fixtureComponent2.componentInstance;
    instanceComponent2 = fixtureComponent2.debugElement.nativeElement;
    component.sellerList = [
      {
        registrtion_Id: 101,
        seller_Name: 'John',
        currencies: ['USD', 'GBR', 'EUR'],
        offices: ['JP', 'UK', 'US', 'FR', 'AU', 'IT'],
        bidded: 'true',
        guaranteed: 'false',
        contact_Name: 'shaushank',
        email: 'john123@gmail.com',
      },
    ];
    fixture.detectChanges();
    fixtureComponent2.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('Current SellerData', () => {
    expect(component.CurrentSellerData).toBeFalsy();
  });
  it('Seller List', () => {
    expect(component.sellerList.length).toEqual(1);
  });

  it('Displayed Columns', () => {
    expect(component.displayedColumns).toEqual([
      'Name',
      'Currencies',
      'Offices',
      'Bidded Deals',
      'Guaranteed Deals',
      'delete',
      'update',
    ]);
  });

  it('CatchData else part ID is not present(Create New Record)', () => {
    //Mock Data
    let index = -1;
    let data = {
      registrtion_Id: 102,
      seller_Name: 'John',
      currencies: ['USD', 'GBR', 'EUR'],
      offices: ['JP', 'UK', 'US', 'FR', 'AU', 'IT'],
      bidded: 'true',
      guaranteed: 'false',
      contact_Name: 'shaushank',
      email: 'john123@gmail.com',
    };
    component.catchData(data);
    expect(component.sellerList.length).toEqual(2);
  });

  it('CatchData if part ID is present(Update Record Record)', () => {
    //Mock Data
    let index = 0;
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

    component.catchData(data);
    expect(component.sellerList.length).toEqual(1);
  });

  it('Record Deleted', () => {
    spyOn(component.dialog, 'open').and.returnValue({
      afterClosed: () => of(true),
    } as MatDialogRef<typeof component>);
    component.delete(101);
    expect(component.sellerList.length).toEqual(0);
  });

  it('Record Not Deleted', () => {
    component.delete(101);
    expect(component.sellerList.length).toEqual(1);
  });
});
