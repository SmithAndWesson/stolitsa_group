import { Component, OnInit } from '@angular/core';
import {UserService} from "../../service/user.service";
import {Contract} from "../../models/Contract";
import {User} from "../../models/User";
import {ContractService} from "../../service/contract.service";
import {ObjectOfSalesService} from "../../service/objectOfSales.service";
import {PaymentService} from "../../service/payment.service";
import {InvoiceService} from "../../service/invoice.service";
import {NotificationService} from "../../service/notification.service";
import {ImageUploadService} from "../../service/image-upload.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  isContractsLoaded = false;
  contracts!: Contract[];

  isUserDataLoaded = false;
  user!: User;
  constructor(
    private router: Router,
    private userService: UserService,
    private contractService: ContractService,
    private notificationService: NotificationService,
    private imageService: ImageUploadService
  ) { }

  ngOnInit(): void {

    this.contractService.getContractsForUser()
    .subscribe(data => {
      this.contracts = data;
      this.isContractsLoaded = true;
    });



    this.userService.getCurrentUser()
    .subscribe(data => {
      this.user = data;
      this.isUserDataLoaded = true;
    });
  }

  formatImage(img: any): any{
    if(img == null){
      return null;
    }
    // return `data:image/` + this.getType(img) + `;base64,` + img;
    return `data:image/jpeg;base64,` + img;

  }

  getType(img : any) : string{
    let extension = ``;
    const decodedString = window.atob(img); //decode the string;
    const lowerCase = decodedString.toLowerCase();
    // find the extension in the decoded string
    if (lowerCase.indexOf("png") !== -1) extension = "png"
    else if (lowerCase.indexOf("svg") !== -1) extension = "svg+xml"
    else if (lowerCase.indexOf("jpg") !== -1 || lowerCase.indexOf("jpeg") !== -1)
      extension = "jpg"
    // add more cases if needed..
    return extension;
  }

}
