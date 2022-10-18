import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Invoice} from "../models/Invoice";

const INVOICE_API = `https://stolitsa-back.herokuapp.com/api/invoices/`;
// const INVOICE_API = `http://localhost:8080/api/invoices/`

@Injectable({
  providedIn: 'root'
})
export class InvoiceService {

  constructor(private http: HttpClient) {
  }

  createInvoice(invoice: Invoice): Observable<any> {
    return this.http.post(INVOICE_API + 'create', invoice);
  }

  deleteInvoice(id: number): Observable<any> {
    return this.http.post(INVOICE_API + id + 'delete', null);
  }

  getAllInvoicesForUser(): Observable<any> {
    return this.http.get(INVOICE_API + 'user/all');
  }

  getAllInvoicesByContractId(contractId: number): Observable<any> {
    return this.http.get(INVOICE_API + 'byContract/' + contractId );
  }

}
