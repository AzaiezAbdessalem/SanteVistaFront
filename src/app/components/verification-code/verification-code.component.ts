import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';  // Importer FormBuilder, FormGroup, Validators
import { AuthService } from 'src/app/service/auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-verification-code',
  templateUrl: './verification-code.component.html',
  styleUrls: ['./verification-code.component.css']
})
export class VerificationCodeComponent implements OnInit {
  verificationForm!: FormGroup;  // Déclarer le FormGroup
  msg: string = '';  // Message d'erreur ou de succès
  email: string = ''; // Récupération de l'e-mail

  constructor(
    private formBuilder: FormBuilder,  // Injecter FormBuilder
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    // Initialisation du formulaire avec un contrôle pour le code
    this.verificationForm = this.formBuilder.group({
      code: ['', [Validators.required, Validators.pattern('^[0-9]{8}$')]]  // Code avec validation pour 8 chiffres
    });

    // Récupérer l'e-mail depuis les paramètres de l'URL
    this.route.queryParams.subscribe(params => {
      this.email = params['email'] || ''; // S'assurer que l'email est défini
      console.log('E-mail récupéré :', this.email);
    });
  }

  submitForm(): void {
    if (this.verificationForm.valid) {  // Vérifier que le formulaire est valide
      const code = this.verificationForm.get('code')?.value;  // Récupérer la valeur du code
      console.log('Formulaire soumis avec succès ! Code:', code);
  
      this.authService.verificationCode(this.email, code).subscribe(
        (response) => {
          // Vérifier si la réponse a un statut de succès
          if (response.status === 200) {
            // Redirection vers la page de réinitialisation du mot de passe avec l'e-mail en query params
            this.router.navigate(['/resetPassword'], { queryParams: { email: this.email } });
          } 
        },
        (error) => {
          // Gestion des erreurs provenant de l'appel HTTP
          this.msg = "Le code de vérification est invalide ou expiré";
        }
      );
    } 
  }
  

  // Rediriger vers la page de connexion
  redirectToLogin(): void {
    this.router.navigate(['/login']);
  }
}
