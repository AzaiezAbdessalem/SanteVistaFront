import { AuthService } from 'src/app/service/auth.service';
import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-email-verification',
  templateUrl: './email-verification.component.html',
  styleUrls: ['./email-verification.component.css']
})
export class EmailVerificationComponent {
  email!: string;
  message: any;
  success: boolean=false;

  constructor(private http: HttpClient, private  authService: AuthService) {}

  verifyEmail() {
    if (this.email) {
      console.log('Formulaire soumis avec succès ! Email:', this.email);
      this.authService.findAccount(this.email).subscribe({
        next: (response) => {
          this.success = true;
          this.message = 'Un lien de vérification a été envoyé à votre email.';
        },
        error: (error) => {
          this.success = false;
          this.message = 'Une erreur est survenue. Veuillez réessayer.';
        }
      })
    

  
}}}
