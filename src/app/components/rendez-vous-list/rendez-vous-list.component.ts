import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { UserService } from '../../service/user.service';
import { User } from '../../class/user';
import { SelectionModel } from '@angular/cdk/collections';
@Component({
  selector: 'app-rendez-vous-list',
  templateUrl: './rendez-vous-list.component.html',
  styleUrls: ['./rendez-vous-list.component.css']
})
export class RendezVousListComponent implements OnInit {

 
  displayedColumns: string[] = ['lastname', 'firstname', 'gender', 'email', 'enabled', 'role'];
  dataSource = new MatTableDataSource<User>([]);
  selection = new SelectionModel<User>(true, []);

  @ViewChild(MatPaginator)
  paginator!: MatPaginator;
  @ViewChild(MatSort)
  sort!: MatSort;

  constructor(private userService: UserService, 
  ) { }

  ngOnInit() {
    this.getAllUsers();
  }

  getAllUsers() {
    this.userService.getAllUsersStatusFalse().subscribe(data => {
      console.log(data);
      this.dataSource.data = data;
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }



  toggleUserAccountEnabled(element: User) {
    this.userService.toggleUserAccountEnabled(element.id).subscribe(data => {

      this.getAllUsers();
    });
  }
}
