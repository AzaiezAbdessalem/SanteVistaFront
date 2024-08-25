import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Regime } from 'src/app/class/regime';
import { RegimeService } from 'src/app/service/regime.service';
import { UserService } from 'src/app/service/user.service';
import { User } from 'src/app/class/user';
import { Activity } from 'src/app/class/activity';
import { ActivityServiceService } from 'src/app/service/activity.service';

@Component({
  selector: 'app-fiche-desuivi',
  templateUrl: './fiche-desuivi.component.html',
  styleUrls: ['./fiche-desuivi.component.css']
})
export class FicheDesuiviComponent implements OnInit {

  userId: string | null = null;
  User: User | null = null;
  regimes: Regime[] = [];
  selectedRegime: Regime | null = null;
  selectedRegimeId: number | null = null;
  activities: Activity[] = [];
  selectedActivity: Activity | null = null;
  selectedActivityId: number | null = null;

  constructor(private userService: UserService, private route: ActivatedRoute, private regimeService: RegimeService,private activityService:ActivityServiceService) {}

  ngOnInit(): void {
    this.userId = this.route.snapshot.paramMap.get('id');
    console.log(this.userId);

    if (this.userId) {
      this.userService.getUserById(this.userId).subscribe((result: User) => {
        this.User = result;
        this.selectedRegimeId = result.idRegime;

        this.selectedActivityId = result.idActivity;
        this.updateSelectedRegime();

        this.updateSelectedActivity();
        console.log(result);
      });
    }
    this.getAllRegimes();
    this.getAllActivities();
    
  }

  getAllRegimes(): void {
    this.regimeService.getAllRegimes().subscribe((data: Regime[]) => {
      this.regimes = data;
      this.updateSelectedRegime();
    });
  }

  getAllActivities(): void {
    this.activityService.getAllActivities().subscribe((data: Activity[]) => {
      this.activities = data;
      this.updateSelectedActivity();
    });
  }

  updateSelectedRegime(): void {
    if (this.selectedRegimeId) {
      this.selectedRegime = this.regimes.find(r => r.id === this.selectedRegimeId) || null;
    }

  }

  updateSelectedActivity(): void {
    if (this.selectedActivityId) {
      this.selectedActivity = this.activities.find(a => a.id === this.selectedActivityId) || null;
    }
  }

  onSelectRegime(): void {
    if (this.selectedRegimeId && this.User) {
      this.User.idRegime = this.selectedRegimeId;
      this.userService.updateUser(this.User).subscribe((updatedUser: any) => {
        this.User = updatedUser;
        this.updateSelectedRegime();
        console.log('Regime updated:', updatedUser);
      });
    }
  }

  onSelectActivity(): void {
    if (this.selectedActivityId && this.User) {
      this.User.idActivity = this.selectedActivityId;
      this.userService.updateUser(this.User).subscribe((updatedUser: any) => {
        this.User = updatedUser;
        this.updateSelectedActivity();
        console.log('Activity updated:', updatedUser);
      });
    }
  }

  deleteRegime(): void {
    if (this.User) {
      this.User.idRegime = null;
      this.userService.updateUser(this.User).subscribe((updatedUser: any) => {
        this.User = updatedUser;
        this.selectedRegime = null;
        this.selectedRegimeId = null;
        console.log('Regime removed:', updatedUser);
      });
    }
  }
  deleteActivity(): void {
    if (this.User) {
      this.User.idActivity = null;
      this.userService.updateUser(this.User).subscribe((updatedUser: any) => {
        this.User = updatedUser;
        this.selectedActivity = null;
        this.selectedActivityId = null;
        console.log('Activity removed:', updatedUser);
      });
    }
  }
}
