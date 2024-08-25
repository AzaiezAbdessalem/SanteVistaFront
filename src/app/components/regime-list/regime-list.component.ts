import { SelectionModel } from '@angular/cdk/collections';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { RegimeService } from 'src/app/service/regime.service';
import { Regime } from 'src/app/class/regime';
import Swal from 'sweetalert2';
import { AddRegimeDialogComponent } from '../add-regime-dialog/add-regime-dialog.component';
import { ConfirmationDialogComponent } from '../confirmation-dialog/confirmation-dialog.component';

@Component({
  selector: 'app-regime-list',
  templateUrl: './regime-list.component.html',
  styleUrls: ['./regime-list.component.css']
})
export class RegimeListComponent implements OnInit {
  displayedColumns: string[] = ['name', 'quantityFruit', 'quantityVegetable', 'quantityProtein', 'quantityCereal', 'forbidden', 'complement', 'actions'];
  dataSource = new MatTableDataSource<Regime>([]);
  selection = new SelectionModel<Regime>(true, []);

  @ViewChild(MatPaginator)
  paginator!: MatPaginator;
  @ViewChild(MatSort)
  sort!: MatSort;

  constructor(private dialog: MatDialog, private regimeService: RegimeService) {}

  ngOnInit(): void {
    this.getAllRegimes();
  }

  getAllRegimes(): void {
    this.regimeService.getAllRegimes().subscribe((data: Regime[]) => {
      this.dataSource.data = data;
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }

  openAddRegimeDialog(): void {
    const dialogRef = this.dialog.open(AddRegimeDialogComponent, {
      width: '450px',
      data: { id: null, name: '', quantityFruit: null, quantityVegetable: null, quantityProtein: null, quantityCereal: null, forbidden: '', complement: '' }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.regimeService.createRegime(result).subscribe((newRegime: Regime) => {
          this.dataSource.data.push(newRegime);
          this.dataSource._updateChangeSubscription();
          Swal.fire({
            title: "Régime ajouté avec succès !",
            icon: 'success',
            timer: 1500,
            showConfirmButton: false
          });
        });
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
        this.regimeService.createRegime(result).subscribe(() => {
          const index = this.dataSource.data.findIndex(r => r.id === result.id);
          this.dataSource.data[index] = result;
          this.dataSource._updateChangeSubscription();
          Swal.fire({
            title: "Régime mis à jour avec succès !",
            icon: 'success',
            timer: 1500,
            showConfirmButton: false
          });
        });
      }
    });
  }

  openConfirmationDialogDelete(element: Regime): void {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      data: { name: element.name, element: " « " + element.name + " »" }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.deleteRegime(element.id);
      }
    });
  }

  deleteRegime(id: number): void {
    this.regimeService.deleteRegime(id).subscribe(() => {
      this.dataSource.data = this.dataSource.data.filter(r => r.id !== id);
      Swal.fire({
        title: "Régime supprimé avec succès !",
        icon: 'success',
        timer: 1500,
        showConfirmButton: false
      });
    });
  }
}
