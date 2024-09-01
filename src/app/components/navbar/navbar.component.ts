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
  Patient:boolean=false
  Nutritionist:boolean=false
  Admin:boolean=false
  profile()
  {
    this.router.navigate(['/profile']);

  }
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
    const roles = localStorage.getItem('roles');
    if (roles) {
      const parsedRoles = JSON.parse(roles);
      // Vérifier si "Patient" est dans les rôles
      if (parsedRoles.includes('Patient')) {
        this.Patient=true;
      }else if(parsedRoles.includes('Nutritionist')){
        this.Nutritionist=true;
      }
      else{
        this.Admin=true;
      }

  }
  }
}
