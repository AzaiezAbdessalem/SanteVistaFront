import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AddRegimeDialogComponent } from '../add-regime-dialog/add-regime-dialog.component';

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

const REGIME_DATA: Regime[] = [
  {id: 1, name: 'Regime A', quantityFruit: 2, quantityVegetable: 3, quantityProtein: 2, quantityCereal: 1, forbidden: 'Sugar', complement: 'Vitamin D'},
  // Add more static data as needed
];

@Component({
  selector: 'app-regime-list',
  templateUrl: './regime-list.component.html',
  styleUrls: ['./regime-list.component.css']
})
export class RegimeListComponent implements OnInit {
  displayedColumns: string[] = ['id', 'name', 'quantityFruit', 'quantityVegetable', 'quantityProtein', 'quantityCereal', 'forbidden', 'complement', 'actions'];
  regimes = REGIME_DATA;

  constructor(public dialog: MatDialog) {}

  ngOnInit(): void {}

  openAddRegimeDialog(): void {
    const dialogRef = this.dialog.open(AddRegimeDialogComponent, {
      width: '250px',
      data: {id: null, name: '', quantityFruit: null, quantityVegetable: null, quantityProtein: null, quantityCereal: null, forbidden: '', complement: ''}
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.regimes.push(result);
      }
    });
  }

  openEditRegimeDialog(regime: Regime): void {
    const dialogRef = this.dialog.open(AddRegimeDialogComponent, {
      width: '250px',
      data: { ...regime }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        const index = this.regimes.findIndex(r => r.id === result.id);
        if (index !== -1) {
          this.regimes[index] = result;
        }
      }
    });
  }

  deleteRegime(id: number): void {
    this.regimes = this.regimes.filter(r => r.id !== id);
  }
}
