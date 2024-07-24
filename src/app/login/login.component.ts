import { AuthService } from './../service/auth.service';
// login.component.ts
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;

  constructor(private formBuilder: FormBuilder, private router: Router,private authservice:AuthService) {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, ]],
      password: ['', [Validators.required, ]]
    });
  }

  navigateTosignup() {
    this.router.navigate(['/register']);
  }

  onSubmit() {
    if (this.loginForm.valid) {
      console.log(this.loginForm.value);
      this.authservice.login(this.loginForm.value.email,this.loginForm.value.password)
      .then((success) => {
        if (success) {
          this.router.navigateByUrl('/');

        } 
      })
    }
  }

  ngOnInit(): void { }
}
