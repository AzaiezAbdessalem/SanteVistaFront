import { Component, OnInit } from '@angular/core';
import dayGridPlugin from '@fullcalendar/daygrid'; // Import dayGridPlugin
import interactionPlugin from '@fullcalendar/interaction'; // Import interactionPlugin
import { ActivatedRoute } from '@angular/router';
import { Regime } from 'src/app/class/regime';
import { RegimeService } from 'src/app/service/regime.service';
import { UserService } from 'src/app/service/user.service';
import { User } from 'src/app/class/user';
import { MatDialog } from '@angular/material/dialog';
import { Appointment } from 'src/app/class/Appointment';
import { AppointmentServiceService } from 'src/app/service/appointment-service.service';
import { AppointmentDialogComponent } from '../../appointment-dialog/appointment-dialog.component';
@Component({
  selector: 'app-rendez-vous',
  templateUrl: './rendez-vous.component.html',
  styleUrls: ['./rendez-vous.component.css']
})
export class RendezVousComponent implements OnInit {
  userId: string | null = null;
  User: User | null = null;
  regimes: Regime[] = [];
  events : Appointment[]=[]

  selectedRegime: Regime | null = null;
  selectedRegimeId: number | null = null;


  // Liste des événements
  constructor(
    private dialog: MatDialog,

     private route: ActivatedRoute,
     private appointmentServiceService:AppointmentServiceService ,
    ) {}

  calendarOptions: any;

  formatEvents(data: any[]): any[] {
    return data.map((appointment, index) => ({
      title: `Rendez-vous ${appointment.name}`, // index + 1 pour commencer à 1 au lieu de 0
      start: `${appointment.date}T${appointment.horaireDebut}`,
      end: `${appointment.date}T${appointment.horaireFin}`
    }));
  }
  accepted:boolean=false


  ngOnInit(): void {
    const roles = localStorage.getItem('roles');
    if (roles) {
      const parsedRoles = JSON.parse(roles);
      // Vérifier si "Patient" est dans les rôles
      if (!parsedRoles.includes('Patient')) {
        this.accepted=true
      }
      
    }
    console.log(this.accepted)
    
    this.route.queryParamMap.subscribe(params => {
      this.userId = params.get('userid');
      console.log('UserID reçu depuis les query parameters:', this.userId);
    });
  if(this.userId)
  {
    this.appointmentServiceService.getAllAppointmentsByUserId(this.userId).subscribe(data=>
    {
      console.log(data)
      this.events = this.formatEvents(data)
      this.calendarOptions = {
        ...this.calendarOptions, // Copie les options actuelles
        events: [...this.events] // Met à jour la liste des événements
      };
    }
    )
  }

 




     const monthsWithEvents = this.getMonthsWithEvents(this.events);

    this.calendarOptions = {
      initialView: 'dayGridMonth',
      plugins: [dayGridPlugin, interactionPlugin],
      editable: true,
      locale: 'fr',
      events: this.events,
      eventColor: '#4caf50',
      visibleRange: {
        start: monthsWithEvents.startDate,
        end: monthsWithEvents.endDate
      },
      headerToolbar: {
        right: 'prev,next', // Boutons de navigation (précédent, suivant)
         left: 'title' // Rien à droite pour enlever le bouton Today
      }
    };
  }

  // Méthode pour obtenir les mois contenant des événements
  getMonthsWithEvents(events: any[]): any {
    let startMonth=  new Date ()
    let endMonth=  new Date () 

    events.forEach(event => {
      const eventStartDate = new Date(event.start);
      const eventEndDate = new Date(event.end);

      if (!startMonth || eventStartDate < startMonth) {
        startMonth = new Date(eventStartDate.getFullYear(), eventStartDate.getMonth(), 1);
      }

      if (!endMonth || eventEndDate > endMonth) {
        endMonth = new Date(eventEndDate.getFullYear(), eventEndDate.getMonth() + 1, 0);
      }
    });

    return {
      startDate: startMonth ? startMonth.toISOString().split('T')[0] : '',
      endDate: endMonth ? endMonth.toISOString().split('T')[0] : ''
    };
  }
  AddRendezVous(): void {
    const dialogRef = this.dialog.open(AppointmentDialogComponent, {
      width: '30%',
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        console.log(result)
        const start = `${result.date}T${result.horaireDebut}:00`;
        const end = `${result.date}T${result.horaireFin}:00`;
    
        this.events.push({
          title: `Rendez-vous ${result.name} `,
          start: start,
          end: end,
          id: 0,
          horaireDebut: {
            hours: 0,
            minutes: 0
          },
          horaireFin: {
            hours: 0,
            minutes: 0
          },
          userId: '',
          date: result.date,
          accepted: false,
          name: ''
        });
        console.log(this.events)
        this.calendarOptions = {
          ...this.calendarOptions, // Copie les options actuelles
          events: [...this.events] // Met à jour la liste des événements
        };
        let appointment=new Appointment()
        appointment.userId=this.userId|| ''
        appointment.horaireDebut=result.horaireDebut
        appointment.horaireFin=result.horaireFin
        appointment.date=result.date
        appointment.name=result.name
          console.log(appointment)

    if(this.userId)
    {
      this.appointmentServiceService.saveAppointment(appointment).subscribe(data=>

        console.log(data)
      )
    }      

  }})




}}