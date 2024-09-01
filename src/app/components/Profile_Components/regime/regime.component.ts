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
  role:any;
  constructor(private regimeService: RegimeService) {}

  ngOnInit(): void {
    this.role=this.getUserRole();
    this.userId=this.getUserId();
    console.log('role',this.role);
    if(this.role="Patient"){
        this.getRegimesByUserIdAndStatusTrue(this.userId||'');
        console.log("this.getRegimesByUserIdAndStatusTrue",this.getRegimesByUserIdAndStatusTrue(this.userId||''))

    }
  }
getUserId():string | null {
  const userId = localStorage.getItem('userId');
  return userId;
}
  getUserRole(): string | null {
    const roles = localStorage.getItem('roles');
    if (roles) {
      const parsedRoles = JSON.parse(roles);
      // Vérifier si "Patient" est dans les rôles
      if (parsedRoles.includes('Patient')) {
        return 'Patient';
      }
    }
    return null;
  }
  getRegimesByUserIdAndStatusTrue(userId:string): void {
    this.regimeService.getRegimesByUserIdAndStatus(userId,true).subscribe((data: Regime[]) => {
      
          console.log('regimesTrue',data)

          this.regime = data[0];  

    });
  }
  
}
