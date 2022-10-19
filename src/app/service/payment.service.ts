import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Payment} from "../models/Payment";

const PAYMENT_API = `https://stolitsa-back.herokuapp.com/api/payments/`;
// const PAYMENT_API = `http://localhost:8080/api/payments/`

@Injectable({
  providedIn: 'root'
})
export class PaymentService {

  constructor(private http: HttpClient) {
  }

  createPayment(payment: Payment): Observable<any> {
    return this.http.post(PAYMENT_API + 'create', payment);
  }

  deletePayment(id: number): Observable<any> {
    return this.http.post(PAYMENT_API + id + 'delete', null);
  }

  getAllPaymentsForUser(): Observable<any> {
    return this.http.get(PAYMENT_API + 'user/all');
  }

  getAllPaymentsByContractId(contractId: number): Observable<any> {
    return this.http.get(PAYMENT_API + 'byContract/' + contractId );
  }

}
