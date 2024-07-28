import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/service/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(private router: Router,private authService: AuthService,) { }
  isAuthenticated: boolean = false;

  navigateToLogin() {
    this.router.navigate(['/login']);
  }
  logout() {
    this.authService.logout()
  }
fullname:any
  ngOnInit(): void {
    this.authService.isLoggedIn.subscribe((authStatus) => {
      this.fullname=localStorage.getItem("fullname")
      this.isAuthenticated = authStatus;
    });
  }

}
