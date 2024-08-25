import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AddRegimeDialogComponent } from '../add-regime-dialog/add-regime-dialog.component';
import { RegimeService } from 'src/app/service/regime.service';
import { Regime } from 'src/app/class/regime';
import Swal from 'sweetalert2';
import { ConfirmationDialogComponent } from '../confirmation-dialog/confirmation-dialog.component';

@Component({
  selector: 'app-regime-list',
  templateUrl: './regime-list.component.html',
  styleUrls: ['./regime-list.component.css']
})
export class RegimeListComponent implements OnInit {
  displayedColumns: string[] = ['name', 'quantityFruit', 'quantityVegetable', 'quantityProtein', 'quantityCereal', 'forbidden', 'complement', 'actions'];
  regimes: Regime[] = [];

  constructor(private dialog: MatDialog, private regimeService: RegimeService) {}

  ngOnInit(): void {
    this.fetchRegimes();
  }

 

  openAddRegimeDialog(): void {
    const dialogRef = this.dialog.open(AddRegimeDialogComponent, {
      width: '450px',
      data: { id: null, name: '', quantityFruit: null, quantityVegetable: null, quantityProtein: null, quantityCereal: null, forbidden: '', complement: '' }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.regimeService.createRegime(result).subscribe((newRegime: Regime) => {
          this.regimes.push(newRegime);
        });
       
        Swal.fire({
          title: "Régime a été ajoutée avec succès !",
          icon: 'success',
          timer: 1500,
          showConfirmButton: false
        });
        this.fetchRegimes();
      }
    });
  }

  openEditRegimeDialog(regime: Regime): void {
    const dialogRef = this.dialog.open(AddRegimeDialogComponent, {
      width: '450px',
      data: { ...regime }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.regimeService.createRegime(result).subscribe((newRegime: Regime) => {
          this.regimes.push(newRegime);
        });
      }
    
      Swal.fire({
        title: "Régime a été mis à jour avec succès !",
        icon: 'success',
        timer: 1500,
        showConfirmButton: false
      });
      this.fetchRegimes();
    });
  }

  openConfirmationDialogDelete(element: any): void {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      data: { name: element.name,  element:  " « "+element.name+" »"   }
    });
  
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        // L'utilisateur a confirmé la suppression
        this.deleteRegime(element.id);
      }
    });
  }
  deleteRegime(id: number): void {
    console.log(id)
    this.regimeService.deleteRegime(id).subscribe((response) => {
     console.log(response)
    });
   
    Swal.fire({
      title: "Régime a été supprimé à jour avec succès !",
      icon: 'success',
      timer: 1500,
      showConfirmButton: false
    });
    this.fetchRegimes();
  }
  fetchRegimes(): void {
    this.regimeService.getAllRegimes().subscribe((data: Regime[]) => {
      this.regimes = data;
    });
  }
}
