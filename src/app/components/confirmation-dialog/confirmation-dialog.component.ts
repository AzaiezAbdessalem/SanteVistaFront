import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-confirmation-dialog',
  templateUrl: './confirmation-dialog.component.html',
  styleUrls: ['./confirmation-dialog.component.css']
})
export class ConfirmationDialogComponent implements OnInit {
  name: string;
  element: string;

  constructor(    public dialogRef: MatDialogRef<ConfirmationDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {
      this.name = data.name;
      this.element = data.element;
     }

  ngOnInit(): void {
  }
  onNoClick(): void {
    this.dialogRef.close(false); // Fermer la boîte de dialogue avec la réponse "false"
  }

  onYesClick(): void {
    this.dialogRef.close(true); // Fermer la boîte de dialogue avec la réponse "true"
  }

  closeDialog() {
    this.dialogRef.close();
  }
}
