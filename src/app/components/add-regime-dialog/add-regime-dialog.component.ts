import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

export interface Regime {
  id: number;
  name: string;
  quantityFruit: number;
  quantityVegetable: number;
  quantityProtein: number;
  quantityCereal: number;
  forbidden: string;
  complement: string;
}

@Component({
  selector: 'app-add-regime-dialog',
  templateUrl: './add-regime-dialog.component.html',
  styleUrls: ['./add-regime-dialog.component.css']
})
export class AddRegimeDialogComponent {

  constructor(
    public dialogRef: MatDialogRef<AddRegimeDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Regime) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

  onSaveClick(): void {
    if (this.data.id === null) {
      this.data.id = Math.floor(Math.random() * 1000) + 1;  // Assign a random ID for new regime
    }
    this.dialogRef.close(this.data);
  }
}
