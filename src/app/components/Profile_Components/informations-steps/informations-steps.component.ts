import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-informations-steps',
  templateUrl: './informations-steps.component.html',
  styleUrls: ['./informations-steps.component.css']
})
export class InformationsStepsComponent implements OnInit {
  objectifFormGroup!: FormGroup;
  infoFormGroup!: FormGroup;
  idealWeight!: number;
  userId:any;
  User :any

  constructor(private userService:UserService,private _formBuilder: FormBuilder) {}

  ngOnInit(): void {
    this.objectifFormGroup = this._formBuilder.group({
      objectif: ['', Validators.required]
    });
    this.infoFormGroup = this._formBuilder.group({
      taille: ['', Validators.required],
      poids: ['', Validators.required]
    });
    this.userId=localStorage.getItem("userId");
console.log(this.userId)
this.userService.getUserById(this.userId).subscribe((result)=>{
  this.User=result;
  console.log(result)
})
  }

  onSubmit(): void {
    const formValues = {
      objectif: this.objectifFormGroup.value.objectif,
      taille: this.infoFormGroup.value.taille,
      poids: this.infoFormGroup.value.poids
    };
      this.User.goal = formValues.objectif;
      this.User.height = formValues.taille;
      this.User.weight = formValues.poids;
      this.userService.updateUser(this.User).subscribe((response) => {
        console.log('User information updated successfully', response);
      });
console.log(this.User)
    this.calculateIdealWeight(formValues);
    console.log('Form values:', formValues);
  }

  calculateIdealWeight(formValues: { taille: number; poids: number }): void {
    // Example calculation; replace with your logic
    this.idealWeight = formValues.taille - 100;
  }
}
