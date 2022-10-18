import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {ObjectOfSales} from "../models/ObjectOfSales";

const OBJECTOFSALES_API = `https://stolitsa-back.herokuapp.com/api/objectofsales/`;
 // const OBJECTOFSALES_API = `http://localhost:8080/api/objectofsales/`

@Injectable({
  providedIn: 'root'
})
export class ObjectOfSalesService {

  constructor(private http: HttpClient) {
  }

  createObjectOfSales(objectOfSales: ObjectOfSales): Observable<any> {
    return this.http.post(OBJECTOFSALES_API + 'create', objectOfSales);
  }

  getAllObjectOfSalesForCurrentUser(): Observable<any> {
    return this.http.get(OBJECTOFSALES_API + 'all');
  }

  getObjectOfSalesById(id: number): Observable<any> {
    return this.http.get(OBJECTOFSALES_API + id );
  }

  deleteObjectOfSales(id: number): Observable<any> {
    return this.http.post(OBJECTOFSALES_API + id + 'delete', null);
  }


}
