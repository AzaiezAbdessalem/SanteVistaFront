import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { UserService } from '../../service/user.service';
import { User } from '../../class/user';
import { SelectionModel } from '@angular/cdk/collections';
import { AppointmentServiceService } from 'src/app/service/appointment-service.service';
import { Appointment } from 'src/app/class/Appointment';
@Component({
  selector: 'app-rendez-vous-list',
  templateUrl: './rendez-vous-list.component.html',
  styleUrls: ['./rendez-vous-list.component.css']
})
export class RendezVousListComponent implements OnInit {

 
  displayedColumns: string[] = ['name',  'date', 'horaireDebut', 'horaireFin', 'accepted'];
  dataSource = new MatTableDataSource<Appointment>([]);
  selection = new SelectionModel<User>(true, []);

  @ViewChild(MatPaginator)
  paginator!: MatPaginator;
  @ViewChild(MatSort)
  sort!: MatSort;

  constructor(private userService: UserService,
     private appointmentServiceService:AppointmentServiceService
  ) { }

  ngOnInit() {
    this.getAllAppointments();
  }

  getAllAppointments() {
    this.appointmentServiceService.getAllAppointments().subscribe(data => {
      console.log(data);
      this.dataSource.data = data;
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }



  Accepted(element: Appointment) {
    if(!element.accepted)
    {
      this.appointmentServiceService.AcceptedRendezVous(element.id).subscribe(
        data=>
        {
          console.log(data)
          this.getAllAppointments();

        }
      )
      console.log(element.accepted)

    }
  
  }
}
