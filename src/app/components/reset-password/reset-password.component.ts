import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/service/auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent implements OnInit {
  ResetPasswordForm: FormGroup = this.formBuilder.group({}); // Initialisation du formulaire
  email: string = ''; // Initialiser l'email

  constructor(
    private formBuilder: FormBuilder,  
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    // Initialisation du formulaire avec validation pour password et confirmPassword
    this.ResetPasswordForm = this.formBuilder.group({
      password: ['', [Validators.required, Validators.minLength(8)]],  // Validation : mot de passe minimum 8 caractères
      confirmPassword: ['', [Validators.required]]  // Validation : confirmation de mot de passe
    }, {
      validator: this.passwordMatchValidator // Ajouter validation pour s'assurer que les mots de passe correspondent
    });

    // Récupérer l'e-mail depuis les paramètres de l'URL
    this.route.queryParams.subscribe(params => {
      this.email = params['email'] || ''; 
      console.log('E-mail récupéré :', this.email);
    });
  }

  // Fonction de validation : vérifier si le mot de passe et la confirmation correspondent
  passwordMatchValidator(formGroup: FormGroup): void {
    const password = formGroup.get('password')?.value;
    const confirmPassword = formGroup.get('confirmPassword')?.value;
    
    if (password !== confirmPassword) {
      formGroup.get('confirmPassword')?.setErrors({ passwordMismatch: true });
    }
  }

  submitForm(): void {
    if (this.ResetPasswordForm.valid) {
      this.authService.resetPassword(this.email, this.ResetPasswordForm.value.password)
        .subscribe((response: any) => {
          console.log('Réinitialisation réussie', response);
          Swal.fire({
            title: "Réinitialisation réussie!",
            icon: 'success',
            timer: 1500,
            showConfirmButton: false
          });

          this.redirectToLogin();
        }, (error: any) => {
          console.error('Erreur lors de la réinitialisation', error);
        });
    }
  }

  redirectToLogin(): void {
    this.router.navigate(['/login']);
  }
}
