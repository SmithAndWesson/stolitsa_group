import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Contract} from "../models/Contract";

const CONTRACT_API = `https://stolitsa-back.herokuapp.com/api/contract/`;
// const CONTRACT_API = `http://localhost:8080/api/contract/`

@Injectable({
  providedIn: 'root'
})
export class ContractService {

  constructor(private http: HttpClient) {
  }

  createContract(contract: Contract): Observable<any> {
    return this.http.post(CONTRACT_API + 'create', contract);
  }

  getContractsForUser(): Observable<any> {
    return this.http.get(CONTRACT_API + 'user/all');
  }

  getContractById(id: any): Observable<any> {
    return this.http.get(CONTRACT_API + 'byId/' + id );
  }

  deleteContract(id: number): Observable<any> {
    return this.http.post(CONTRACT_API + id + 'delete', null);
  }


}
