import { Component, OnInit } from '@angular/core';
import {Contract} from "../../../models/Contract";
import {User} from "../../../models/User";
import {ActivatedRoute, ParamMap, Router} from "@angular/router";
import {UserService} from "../../../service/user.service";
import {ContractService} from "../../../service/contract.service";
import {ObjectOfSalesService} from "../../../service/objectOfSales.service";
import {PaymentService} from "../../../service/payment.service";
import {InvoiceService} from "../../../service/invoice.service";
import {NotificationService} from "../../../service/notification.service";
import {ImageUploadService} from "../../../service/image-upload.service";
import {switchMap} from "rxjs/operators";
import {of} from "rxjs";

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

  isContractsLoaded = false;
  contracts!: Contract[];

  isUserDataLoaded = false;
  user!: User;
  constructor(
    private _Activatedroute: ActivatedRoute,
    private router: Router,
    private userService: UserService,
    private contractService: ContractService,
    private objectOfSalesService: ObjectOfSalesService,
    private paymentService: PaymentService,
    private invoiceService: InvoiceService,
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

  getAllInvoicesByContractId(contracts: Contract[]): void{
    contracts.forEach(c => {
      if (c.id != null) {
        this.invoiceService.getAllInvoicesByContractId(c.id)
        .subscribe(data=>{
          c.invoices = data;
        });
      }
    })
  }

  getAllPaymentsByContractId(contracts: Contract[]): void{
    contracts.forEach(c => {
      if (c.id != null) {
        this.paymentService.getAllPaymentsByContractId(c.id)
        .subscribe(data=>{
          c.payments = data;
        });
      }
    })
  }

  getObjOfSales(contracts: Contract[]): void{
    contracts.forEach(c => {
      if (c.id != null) {
        this.objectOfSalesService.getObjectOfSalesById(c.objectOfSalesId)
        .subscribe(data=>{
          c.objectOfSales = data;
        });
      }
    })
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

  toContract(param : any): void{
    // this._Activatedroute.paramMap.pipe(
    //   switchMap((params: ParamMap) => {
    //
    //
    //     return of(param);
    //   })
    // ).subscribe(
    //   result => {
    //     console.log(result)
    //     this.router.navigate(['main/contracts/' + param], {relativeTo: this._Activatedroute})
    //   },
    //   error => {
    //     console.log('Error on fetching data: ', error);
    //   }
    // );

    this.router.navigate(['./contracts/'+param], {relativeTo: this._Activatedroute})
    // .then(() => {
    //   window.location.reload();
    // });
  }
}
