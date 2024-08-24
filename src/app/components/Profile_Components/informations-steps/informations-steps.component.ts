import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-informations-steps',
  templateUrl: './informations-steps.component.html',
  styleUrls: ['./informations-steps.component.css']
})
export class InformationsStepsComponent implements OnInit {
  objectifFormGroup!: FormGroup;
  infoFormGroup!: FormGroup;
  idealWeight!: number;

  constructor(private _formBuilder: FormBuilder) {}

  ngOnInit(): void {
    this.objectifFormGroup = this._formBuilder.group({
      objectif: ['', Validators.required]
    });
    this.infoFormGroup = this._formBuilder.group({
      taille: ['', Validators.required],
      poids: ['', Validators.required]
    });
  }

  onSubmit(): void {
    const formValues = {
      objectif: this.objectifFormGroup.value.objectif,
      taille: this.infoFormGroup.value.taille,
      poids: this.infoFormGroup.value.poids
    };

    this.calculateIdealWeight(formValues);
    console.log('Form values:', formValues);
  }

  calculateIdealWeight(formValues: { taille: number; poids: number }): void {
    // Example calculation; replace with your logic
    this.idealWeight = formValues.taille - 100;
  }
}
