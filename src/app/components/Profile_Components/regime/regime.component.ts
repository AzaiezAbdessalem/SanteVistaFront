import { Component, OnInit } from '@angular/core';
import { RegimeService } from 'src/app/service/regime.service';
import { UserService } from 'src/app/service/user.service';
import { User } from 'src/app/class/user';
import { Regime } from 'src/app/class/regime';

@Component({
  selector: 'app-regime',
  templateUrl: './regime.component.html',
  styleUrls: ['./regime.component.css']
})
export class RegimeComponent implements OnInit {
  userId: string | null = null;
  User: User | undefined;
  regime: Regime | undefined;

  constructor(private userService: UserService, private regimeService: RegimeService) {}

  ngOnInit(): void {
    this.getUser();
  }

  getUser(): void {
    this.userId = localStorage.getItem("userId");
    if (this.userId) {
      this.userService.getUserById(this.userId).subscribe((result: User) => {
        this.User = result;
        console.log(result);
        this.getRegimeById(); // Call after setting User
      });
    }
  }

  getRegimeById(): void {
    if (this.User && this.User.idRegime) {
      this.regimeService.getRegimeById(this.User.idRegime).subscribe((result: Regime) => {
        this.regime = result;
        console.log(result);
      });
    } else {
      console.error('User or User.idRegime is undefined');
    }
  }
}
