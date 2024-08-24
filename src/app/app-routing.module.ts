import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { UserManagementComponent } from './user-management/user-management.component';
import { ProfileComponent } from './components/Profile_Components/profile/profile.component';
import { InformationsStepsComponent } from './components/Profile_Components/informations-steps/informations-steps.component';
import { InformationsComponent } from './components/Profile_Components/informations/informations.component';
import { RegimeComponent } from './components/Profile_Components/regime/regime.component';
import { ActiviteComponent } from './components/Profile_Components/activite/activite.component';
import { AnalyseComponent } from './components/Profile_Components/analyse/analyse.component';
import { RendezVousComponent } from './components/Profile_Components/rendez-vous/rendez-vous.component';
import { RegimeListComponent } from './components/regime-list/regime-list.component';

const routes: Routes = [

  {path:"", component: HomeComponent},
  {path:"login", component: LoginComponent},
  {path:"register", component: RegisterComponent},
  {path:"users", component: UserManagementComponent},

  {path:"profile", component: ProfileComponent},
  {path:"steps", component: InformationsStepsComponent},
  {path:"informations", component: InformationsComponent},
  {path:"regime", component: RegimeComponent},
  {path:"activites", component: ActiviteComponent},
  {path:"analyse", component: AnalyseComponent},
  {path:"rendez-vous", component: RendezVousComponent},
  {path:"regimeList", component: RegimeListComponent},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
