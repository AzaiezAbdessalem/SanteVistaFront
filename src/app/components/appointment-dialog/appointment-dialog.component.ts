import { UserService } from './../../service/user.service';
import { Component, Inject, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Appointment } from 'src/app/class/Appointment';

@Component({
  selector: 'app-appointment-dialog',
  templateUrl: './appointment-dialog.component.html',
  styleUrls: ['./appointment-dialog.component.css']
})
export class AppointmentDialogComponent implements OnInit {

  appointmentForm!: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<AppointmentDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any ,
    private fb: FormBuilder,
  ) {}
fullname:any
  ngOnInit(): void {
    this.fullname=this.data
    console.log(this.fullname)
    this.appointmentForm = this.fb.group({
      name: [''],
      date: ['', [Validators.required, this.futureDateValidator]],
      horaireDebut: ['', Validators.required],
      horaireFin: ['', [Validators.required, this.timeRangeValidator.bind(this)]]
    });
  }

  futureDateValidator(control: AbstractControl): { [key: string]: boolean } | null {
    const today = new Date();
    const selectedDate = new Date(control.value);
    if (selectedDate < today) {
      return { 'dateInPast': true };
    }
    return null;
  }

  timeRangeValidator(control: AbstractControl): { [key: string]: boolean } | null {
    const form = control.parent;
    if (form) {
      const startTime = form.get('horaireDebut')?.value;
      const endTime = control.value;
  

  
      if (startTime && endTime) {

     console.log((endTime - startTime) )
        const isValid = endTime > startTime  ;
        console.log('Is Valid:', isValid);
  
        if (!isValid) {
          return { 'invalidTimeRange': true };
        }
      }
    }
    return null;
  }
  appointment =new Appointment()

  onSubmit(): void {
    if (this.appointmentForm.valid) {
      this.appointment=this.appointmentForm.value
      this.appointment.name=this.fullname|| ''
      this.dialogRef.close(this.appointment);
    }
  }

  onCancel(): void {
    this.dialogRef.close();
  }
}
