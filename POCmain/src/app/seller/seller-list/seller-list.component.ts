import { Component, Input, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { SellerData } from '../registrationFields';
import {ToastrService} from 'ngx-toastr';
@Component({
  selector: 'app-seller-list',
  templateUrl: './seller-list.component.html',
  styleUrls: ['./seller-list.component.scss'],
})
export class SellerListComponent implements OnInit {
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
  constructor(private toaster:ToastrService) {}

  ngOnInit(): void {}

  //catch record from seller-form
  catchData=(data: SellerData)=> {
    let x = data.registrtion_Id;
    let index = this.sellerList.findIndex((obj) => obj.registrtion_Id == x);
    //update record
    if (index != -1) {
      this.sellerList.splice(index, 1, data);
      this.sellerList = [...this.sellerList];
      this.toaster.success(`Hello ${data.seller_Name} your data is Successfully Updated`);
    }
    //create new record
    else {
      this.sellerList.push(data);
      this.sellerList = [...this.sellerList];
      this.toaster.success(`Congratulation ${data.seller_Name} Your Data is Saved`);
    }
  }

  //delete record
  delete = (Id: number) => {
    let ID = this.sellerList.findIndex((obj) => obj.registrtion_Id == Id);
    this.sellerList.splice(ID, 1);
    this.sellerList = [...this.sellerList];
    this.toaster.success(`Record is Successfully Deleted`);
  };
}
