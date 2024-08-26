import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-appointment-dialog',
  templateUrl: './appointment-dialog.component.html',
  styleUrls: ['./appointment-dialog.component.css']
})
export class AppointmentDialogComponent implements OnInit {

  rendezVous = {
    date: '',
    horaireDebut: '',
    horaireFin: ''
  };

  constructor(public dialogRef: MatDialogRef<AppointmentDialogComponent>) {}

  ngOnInit(): void {
  }

  
  onSubmit(): void {
    this.dialogRef.close(
      this.rendezVous
    );
  }

  onCancel(): void {
    this.dialogRef.close();
  }
}