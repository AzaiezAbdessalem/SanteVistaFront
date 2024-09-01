import { SelectionModel } from '@angular/cdk/collections';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Activity } from 'src/app/class/activity';
import { ActivityServiceService } from 'src/app/service/activity.service';
import { AddActivityComponent } from '../add-activity/add-activity.component';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmationDialogComponent } from '../confirmation-dialog/confirmation-dialog.component';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-list-activity',
  templateUrl: './list-activity.component.html',
  styleUrls: ['./list-activity.component.css']
})
export class ListActivityComponent implements OnInit {
  displayedColumns: string[] = ['name', 'duree','link','repetition','actions'];
  dataSource = new MatTableDataSource<Activity>([]);
  selection = new SelectionModel<Activity>(true, []);

  @ViewChild(MatPaginator)
  paginator!: MatPaginator;
  @ViewChild(MatSort)
  sort!: MatSort;
  constructor(private activityService:ActivityServiceService,private dialog: MatDialog,) { }

  ngOnInit(): void {
    this.getAllActivities();
  }


  getAllActivities() {
    this.activityService.getAllActivities().subscribe(data => {
      console.log(data);
      this.dataSource.data = data;
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }

  openEditActivity(id: number) {
    const dialogRef = this.dialog.open(AddActivityComponent, {
      width: '50%',
      data: {id: id},
     panelClass: 'custom-dialog-container',

    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('msg',result);
      this.getAllActivities();

    });
  }

  openConfirmationDialogDelete(activity: any): void {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      data: { name: activity.name,  element:  " « "+activity.name+" »"   }
    });
  
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        // L'utilisateur a confirmé la suppression
        this.deleteActivity(activity.id);
      }
    });
  }
  deleteActivity(id: number) {
    this.activityService.deleteActivity(id).subscribe(
      (response) => {
        console.log('activité a été supprimée avec succès  !');
  
          Swal.fire({
            text: "activité a été supprimée avec succès !",
            icon: 'success',
            showConfirmButton: false,
            timer: 1500 // Closes automatically after 1.5 seconds
          });
       
  
       this.getAllActivities();
      },
      (error) => {
        console.log(error)
      }
    );
  }
  
  openAddActivity() {
    const dialogRef = this.dialog.open(AddActivityComponent, {
      width: '50%',
     
      
      data: {},
     panelClass: 'custom-dialog-container',

    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('msg',result);
      this.getAllActivities();

    });
   
  }
}
