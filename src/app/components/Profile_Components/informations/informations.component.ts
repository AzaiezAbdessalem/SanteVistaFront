import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-informations',
  templateUrl: './informations.component.html',
  styleUrls: ['./informations.component.css']
})
export class InformationsComponent implements OnInit {
userId:any;
User :any
  constructor(private userService:UserService) {  
  }

  ngOnInit(): void {
this.userId=localStorage.getItem("userId");
console.log(this.userId)
this.userService.getUserById(this.userId).subscribe((result)=>{
  this.User=result;
  console.log(result)
})
  }

}
