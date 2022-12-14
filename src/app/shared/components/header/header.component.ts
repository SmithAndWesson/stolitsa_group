import { Component, OnInit } from '@angular/core';
import {User} from "../../../models/User";
import {TokenStorageService} from "../../../service/token-storage.service";
import {UserService} from "../../../service/user.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  isLoggedIn = false;
  isDataLoaded = false;
  user!: User;

  constructor(private tokenService: TokenStorageService,
              private userService: UserService,
              private router: Router) { }

  ngOnInit(): void {
    this.isLoggedIn = !!this.tokenService.getToken();

    if(this.isLoggedIn) {
      this.userService.getCurrentUser()
      .subscribe(data => {
        this.user = data;
        this.isDataLoaded = true;
      })
    }
  }

  logout(): void {
    this.tokenService.logOut();
    this.router.navigate(['/login']);
  }

  profile(): void{
    this.router.navigate(['/profile']);
  }

}
