import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { AuthService } from 'src/app/service/auth.service';

@Component({
  selector: 'app-email-verification',
  templateUrl: './email-verification.component.html',
  styleUrls: ['./email-verification.component.css']
})
export class EmailVerificationComponent implements OnInit {
  loginForm!: FormGroup;
  message: any;
  success: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private http: HttpClient, 
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]]
    });
  }

  verifyEmail() {
    if (this.loginForm.valid) {
      const email = this.loginForm.get('email')?.value;
      console.log('Formulaire soumis avec succès ! Email:', email);
      this.authService.findAccount(email).subscribe({
        next: (response) => {
          console.log(response)
          this.success = true;
          this.message = 'Un lien de vérification a été envoyé à votre email.';
          
        },
        error: (error) => {
          this.success = false;
          this.message = 'Une erreur est survenue. Veuillez réessayer.';
        }
      });
    }
  }
}
