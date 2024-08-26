import { SelectionModel } from '@angular/cdk/collections';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { User } from 'src/app/class/user';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-patient-list',
  templateUrl: './patient-list.component.html',
  styleUrls: ['./patient-list.component.css']
})
export class PatientListComponent  implements OnInit {

  displayedColumns: string[] = ['lastname', 'firstname', 'email', 'role', 'gender', 'actions'];
 
  dataSource = new MatTableDataSource<User>([]);
  selection = new SelectionModel<User>(true, []);

  @ViewChild(MatPaginator)
  paginator!: MatPaginator;
  @ViewChild(MatSort)
  sort!: MatSort;

  constructor(private userService: UserService,private router: Router)  { }

  ngOnInit() {
    this.getAllUsers();
  }

  getAllUsers() {
    this.userService.getAllUsersPatient().subscribe(data => {
      console.log(data);
      this.dataSource.data = data;
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }
  navigateToSuiviFile(id: any): void {
    if (id) {
      this.router.navigate(['/suiviFile'], { queryParams: { userid: id } });
    } else {
      console.error('ID is undefined or null');
    }
  }
  
}
