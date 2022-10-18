import {ObjectOfSales} from "./ObjectOfSales";
import {Payment} from "./Payment";
import {Invoice} from "./Invoice";

export interface Contract {

  id: number;
  number: string;
  createDate: string;
  objectOfSales: ObjectOfSales;
  objectOfSalesId: number;
  guid: string;
  payments?: Payment[];
  invoices?: Invoice[];
}
