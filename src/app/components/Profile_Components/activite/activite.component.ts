import { Component, OnInit } from '@angular/core';
import { Activity } from 'src/app/class/activity';
import { User } from 'src/app/class/user';
import { ActivityServiceService } from 'src/app/service/activity.service';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-activite',
  templateUrl: './activite.component.html',
  styleUrls: ['./activite.component.css']
})
export class ActiviteComponent implements OnInit {
  userId: string | null = null;
  User: User | undefined;
  activity: Activity | undefined;
  activites:Activity[]=[]
  constructor(private userService: UserService, private activityService: ActivityServiceService) { }

  ngOnInit(): void {
    //this.getUser();
    this.getAllActivitesByUserId();
  }
  // getUser(): void {
  //   this.userId = localStorage.getItem("userId");
  //   if (this.userId) {
  //     this.userService.getUserById(this.userId).subscribe((result: User) => {
  //       this.User = result;
  //       console.log(result);
  //       this.getActivityById(); // Call after setting User
  //     });
  //   }
  // }

  // getActivityById(): void {
  //   if (this.User && this.User.idActivity) {
  //     this.activityService.getActivityById(this.User.idActivity).subscribe((result: Activity) => {
  //       this.activity = result;
  //       console.log(result);
  //     });
  //   } else {
  //     console.error('User or User.idActivity is undefined');
  //   }
  // }

  getAllActivitesByUserId(): void {
    this.userId = localStorage.getItem("userId");
    this.activityService.getActivitesByUserId(this.userId||'').subscribe(
      (data) => {
        this.activites = data;
        console.log('Activités récupérées:', this.activites);
      },
      (error) => {
        console.error('Erreur lors de la récupération des activités:', error);
      }
    );
  }
}
