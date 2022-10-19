import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, ParamMap, Params, Router} from "@angular/router";
import {Contract} from "../../models/Contract";
import {UserService} from "../../service/user.service";
import {ContractService} from "../../service/contract.service";
import {ObjectOfSalesService} from "../../service/objectOfSales.service";
import {PaymentService} from "../../service/payment.service";
import {InvoiceService} from "../../service/invoice.service";
import {NotificationService} from "../../service/notification.service";
import {ImageUploadService} from "../../service/image-upload.service";
import {User} from "../../models/User";
import {ObjectOfSales} from "../../models/ObjectOfSales";
import {Subject} from "rxjs";
import {switchMap, takeUntil} from "rxjs/operators";
import {Subscription} from "rxjs";
import {Payment} from "../../models/Payment";

import { of } from 'rxjs';

@Component({
  selector: 'app-contracts',
  templateUrl: './contracts.component.html',
  styleUrls: ['./contracts.component.scss']
})
export class ContractsComponent implements OnInit, OnDestroy  {

  id!:any;
  contract !: Contract;
  objectOfSales !: ObjectOfSales;
  isContractsLoaded = false;
  componentDestroyed$: Subject<boolean> = new Subject()
  name: string = "";
  category: string = "";
  area: number = 0;
  houseNumber: string = "";

  displayedColumns: string[] = ['mark','createDate','summ'];
  dataSource: any[] = [];

  constructor(private route: ActivatedRoute,
              private router: Router,
              private userService: UserService,
              private contractService: ContractService,
              private objectOfSalesService: ObjectOfSalesService,
              private paymentService: PaymentService,
              private invoiceService: InvoiceService,
              private notificationService: NotificationService,
              private imageService: ImageUploadService) {


  }

  ngOnDestroy(): void {

  }

  ngOnInit(): void {
    this.isContractsLoaded = false;

    this.route.paramMap.pipe(
      switchMap((params: ParamMap) => {
        this.isContractsLoaded = false;
        this.id = params.get('id');
        return of(params.get('id'));
      })
    ).subscribe(
      result => {
        this.dataSource = [];
        this.contractService.getContractById(result ).subscribe(data => {
          this.contract = data;
          this.getObjOfSales(data);
          this.getAllPaymentsByContractId(data);
          this.getAllInvoicesByContractId(data);
        });
        this.isContractsLoaded = true;
      },
      error => {
        console.log('Error on fetching data: ', error);
      }
    );


    // SECONT TRY
    // this.contractService.getContractById(this.id)
    // .subscribe(data => {
    //   this.dataSource = [];
    //
    //   this.contract = data;
    //   this.getObjOfSales(data);
    //   this.getAllPaymentsByContractId(data)
    //   this.getAllInvoicesByContractId(data);
    //
    //   this.isContractsLoaded = true;
    // });

    // THIRD TRY
    // this.route.paramMap.subscribe(params => {
    //   this.id = params.get('id')
    //   this.contractService.getContractById(this.id)
    //   .subscribe(data => {
    //     this.dataSource = [];
    //
    //     this.contract = data;
    //     this.getObjOfSales(data);
    //     this.getAllPaymentsByContractId(data)
    //     this.getAllInvoicesByContractId(data);
    //
    //     this.isContractsLoaded = true;
    //   });
    // });

  }
  getAllInvoicesByContractId(contract: Contract): void {
    this.invoiceService.getAllInvoicesByContractId(contract.id)
    .subscribe(data => {
      this.contract.invoices = data;
      this.dataSource = this.dataSource.concat(data);
      this.dataSource = this.dataSource.sort(
        function(objA, objB) {
          var a = new Date(objA.createDate);
          var b = new Date(objB.createDate);
        return  Number(a.getTime()) - Number(b.getTime());
      },);
    });
  }


  getAllPaymentsByContractId(contract: Contract): void {
    this.paymentService.getAllPaymentsByContractId(contract.id)
    .subscribe(data => {
      this.contract.payments = data;
      this.dataSource = this.dataSource.concat(data);
      this.dataSource = this.dataSource.sort(
        function(objA, objB) {
          var a = new Date(objA.createDate);
          var b = new Date(objB.createDate);
          return  Number(a.getTime()) - Number(b.getTime());
        },);
    });
  }


  getObjOfSales(contract: Contract): void {
    this.objectOfSalesService.getObjectOfSalesById(contract.objectOfSalesId)
    .subscribe(data => {

      this.contract.objectOfSales = data;
      //need to look one more time "contract.objectOfSales." need this in html
      this.objectOfSales = data;
      this.name = data.name;
      this.category= data.category;
      this.area= data.area;
      this.houseNumber= data.houseNumber;
    });
  }

}
