import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  navigateTo(path: string): void {
    const userid=localStorage.getItem("userId")
    console.log(userid)
    console.log(path)

   if(path==="rendez-vous" && userid)
   {

    this.router.navigate([path],{ queryParams: { userid: userid } });
   }
   
  }
}
