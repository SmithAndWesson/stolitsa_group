import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {User} from "../models/User";
import {Observable} from "rxjs";

const AUTH_API = `https://stolitsa-back.herokuapp.com/api/auth/`;//`http://localhost:8080/api/auth/`;
 // const AUTH_API = `http://localhost:8080/api/auth/`;

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  public login(user: any): Observable<any> {
    return this.http.post(AUTH_API + 'signin', {
      username: user.username,
      password: user.password
    });
  }

  public register(user: any): Observable<any> {
    return this.http.post(AUTH_API + 'signup', {
      email: user.email,
      username: user.username,
      phoneNumber: user.phoneNumber,
      password: user.password,
      confirmPassword: user.confirmPassword
    });
  }
}
