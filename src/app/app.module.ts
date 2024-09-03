import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { FooterComponent } from './components/footer/footer.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { FaqComponent } from './components/faq/faq.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { JwtModule } from '@auth0/angular-jwt';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { UserManagementComponent } from './components/user-management/user-management.component';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { AuthInterceptor } from './utility/auth.interceptor';
import { ProfileComponent } from './components/Profile_Components/profile/profile.component';
import { InformationsStepsComponent } from './components/Profile_Components/informations-steps/informations-steps.component';
import { MatStepperModule } from '@angular/material/stepper';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { InformationsComponent } from './components/Profile_Components/informations/informations.component';
import { RegimeComponent } from './components/Profile_Components/regime/regime.component';
import { ActiviteComponent } from './components/Profile_Components/activite/activite.component';
import { AnalyseComponent } from './components/Profile_Components/analyse/analyse.component';
import { RendezVousComponent } from './components/Profile_Components/rendez-vous/rendez-vous.component';
import { SidebarComponent } from './components/Profile_Components/sidebar/sidebar.component';
import { RegimeListComponent } from './components/regime-list/regime-list.component';
import { AddRegimeDialogComponent } from './components/add-regime-dialog/add-regime-dialog.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ListActivityComponent } from './components/list-activity/list-activity.component';
import { AddActivityComponent } from './components/add-activity/add-activity.component';
import { ConfirmationDialogComponent } from './components/confirmation-dialog/confirmation-dialog.component';
import { PatientListComponent } from './components/patient-list/patient-list.component';
import { FicheDesuiviComponent } from './components/fiche-desuivi/fiche-desuivi.component';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { FullCalendarModule } from '@fullcalendar/angular';
import { AppointmentDialogComponent } from './components/appointment-dialog/appointment-dialog.component';
import { RendezVousListComponent } from './components/rendez-vous-list/rendez-vous-list.component';
import { EmailVerificationComponent } from './components/email-verification/email-verification.component'; // Import FullCalendar module


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    FooterComponent,
    NavbarComponent,
    LoginComponent,
    RegisterComponent,
    FaqComponent,
    UserManagementComponent,
    ProfileComponent,
    InformationsStepsComponent,
    InformationsComponent,
    RegimeComponent,
    ActiviteComponent,
    AnalyseComponent,
    RendezVousComponent,
    SidebarComponent,
    RegimeListComponent,
    AddRegimeDialogComponent,
    ListActivityComponent,
    AddActivityComponent,
    ConfirmationDialogComponent,
    PatientListComponent,
    FicheDesuiviComponent,
    AppointmentDialogComponent,
    RendezVousListComponent,
    EmailVerificationComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule  ,
    HttpClientModule,
    MatPaginatorModule,
    MatSortModule,
    MatIconModule,
    MatMenuModule,
    MatButtonModule,
    MatTableModule,
    MatStepperModule,
    MatInputModule,
    MatSelectModule,
    FormsModule,
    MatDialogModule,
    BrowserAnimationsModule,
    MatFormFieldModule,
    MatDatepickerModule,
    MatNativeDateModule,
    FullCalendarModule,
    JwtModule.forRoot({
      config: {
        tokenGetter: () => localStorage.getItem('token'), // Fonction pour récupérer le token JWT du local storage
      },
    }),

    BrowserAnimationsModule,

  ],
  providers: [ {
    provide: HTTP_INTERCEPTORS,
    useClass: AuthInterceptor,
    multi: true,
  },],
  bootstrap: [AppComponent]
})
export class AppModule { }
