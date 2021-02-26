import { Component, OnInit } from '@angular/core';
import { SellerData } from '../registrationFields';
import { ToastrService } from 'ngx-toastr';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmationDialogComponent } from '../confirmation-dialog/confirmation-dialog.component';

@Component({
  selector: 'app-seller-list',
  templateUrl: './seller-list.component.html',
  styleUrls: ['./seller-list.component.scss'],
})
export class SellerListComponent implements OnInit {
  dialogRef;
  CurrentSellerData?: SellerData;
  sellerList: SellerData[] = [];
  displayedColumns: string[] = [
    'Name',
    'Currencies',
    'Offices',
    'Bidded Deals',
    'Guaranteed Deals',
    'delete',
    'update',
  ];

  constructor(private toaster: ToastrService, public dialog: MatDialog) {}

  ngOnInit(): void {}

  //catch record from seller-form
  catchData = (data: SellerData) => {
    let x = data.registrtion_Id;
    let index = this.sellerList.findIndex((obj) => obj.registrtion_Id == x);
    //update record
    if (index != -1) {
      this.sellerList.splice(index, 1, data);

      // TO FORCE DATA-TABLE's DATASOURCE TO REFRESH
      this.sellerList = [...this.sellerList];
      this.toaster.success(`Updated Successfully`);
    }
    //create new record
    else {
      this.sellerList.push(data);
      this.sellerList = [...this.sellerList];
      this.toaster.success(`Saved Successfully`);
    }
  };

  //delete record
  delete = (Id: number) => {
    // open dialog
    this.dialogRef = this.dialog.open(ConfirmationDialogComponent);

    this.dialogRef.afterClosed().subscribe((result) => {
      // if delete click
      if (result) {
        let ID = this.sellerList.findIndex((obj) => obj.registrtion_Id == Id);
        this.sellerList.splice(ID, 1);
        this.sellerList = [...this.sellerList];
        this.toaster.success(`Deleted Successfully`);
      }
    });
  };

  //trackby (Replace only updated DOM element from collection not whole collection)
  trackList(index: number, item: SellerData): string {
    return `${item.registrtion_Id}`;
  }
}
