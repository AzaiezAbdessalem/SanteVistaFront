import { RoleService } from './../service/role.service';
import { AuthService } from './../service/auth.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Role } from '../class/role';
import { User } from '../class/user';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  registerForm!: FormGroup;

  roles:Role[]=[]
  rolesSelected:Role[]=[]

  user: User=new User()
  constructor(private fb: FormBuilder,
     private router: Router,
      private roleService:RoleService,
    private authService:AuthService
    ) { }

  ngOnInit(): void {
    this.roleService.getAllRolesStatusFalse().subscribe((data: Role[]) => { 
      this.roles = data;  
      console.log(this.roles)
    })


 console.log(this.roles)
    this.registerForm = this.fb.group({
      firstname: ['', [Validators.required, Validators.minLength(2)]],
      lastname: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(3)]],
      gender: ['', Validators.required],
      role: ['', Validators.required]
    });
  }

  navigateTosignin() {
    this.router.navigate(['/login']);
  }
submited:boolean=false
role=new Role
  onSubmit() {
    this.submited=true
    console.log(' Submitted', this.registerForm.value);

    if (this.registerForm.valid) {
      this.user.lastname=this.registerForm.value.lastname
      this.user.email=this.registerForm.value.email
      this.user.username=this.registerForm.value.email
      this.user.firstname=this.registerForm.value.firstname
      this.user.password=this.registerForm.value.password
      this.user.gender=this.registerForm.value.gender
      console.log(' this.user', this.user);

      this.roles.find
      (
        (data:Role)=> {
          if(          data.id==this.registerForm.value.role )
{          this.rolesSelected.push(data)
}
        }
      )
      this.user.roles=this.rolesSelected
     if(this.user)
     {
      this.authService.register(this.user).subscribe
      (data=>
      {
        Swal.fire({
          text: 'Registration has been successfully done',
          icon: 'success',
          timer: 1500,
          showConfirmButton: false
      }).then(() => {
    // Cette partie sera exécutée après avoir cliqué sur "OK" dans la fenêtre modale
    this.navigateTosignin() 
   });
      }
      )
     }
      // handle form submission
    }
  }

 
}
