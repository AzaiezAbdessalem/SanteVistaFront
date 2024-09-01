import { AppointmentServiceService } from './../../service/appointment-service.service';
import { Component, OnInit } from '@angular/core';
import dayGridPlugin from '@fullcalendar/daygrid'; // Import dayGridPlugin
import interactionPlugin from '@fullcalendar/interaction'; // Import interactionPlugin
import { ActivatedRoute } from '@angular/router';
import { Regime } from 'src/app/class/regime';
import { RegimeService } from 'src/app/service/regime.service';
import { UserService } from 'src/app/service/user.service';
import { User } from 'src/app/class/user';

import { Activity } from 'src/app/class/activity';
import { ActivityServiceService } from 'src/app/service/activity.service';


import { AppointmentDialogComponent } from 'src/app/components/appointment-dialog/appointment-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { Appointment } from 'src/app/class/Appointment';
import { Analyse } from 'src/app/class/analyse';


@Component({
  selector: 'app-fiche-desuivi',
  templateUrl: './fiche-desuivi.component.html',
  styleUrls: ['./fiche-desuivi.component.css']
})
export class FicheDesuiviComponent implements OnInit {
  userId: string | null = null;
  userIds:string[]=[]
  User: User | null = null;
  regimes: Regime[] = [];
  events : Appointment[]=[]

  selectedRegime: Regime | null = null;
  selectedRegimeId: number | null = null;
  activities: Activity[] = [];
  selectedActivity: Activity | null = null;
  selectedActivityId: number | null = null;
  role:any;

  constructor(private userService: UserService, private route: ActivatedRoute, private regimeService: RegimeService,
    private activityService:ActivityServiceService, private dialog: MatDialog,private appointmentServiceService:AppointmentServiceService) {}


  calendarOptions: any;

  formatEvents(data: any[]): any[] {
    return data.map((appointment, index) => ({
      title: `Rendez-vous ${appointment.name}`, // index + 1 pour commencer à 1 au lieu de 0
      start: `${appointment.date}T${appointment.horaireDebut}`,
      end: `${appointment.date}T${appointment.horaireFin}`
    }));
  }
   fullname:any
   analyses :Analyse[]=[]
   getAllAnalysesByUserId(userId:string)
   {
     if( this.userId)
       {
     this.regimeService.getAllAnalyses(userId).subscribe(data=>
       {      
        this.analyses=data
        console.log(this.analyses)
       }
      )}
   }
  
  ngOnInit(): void {
    
    // this.role=this.getUserRole();
    // console.log('role',this.role);

    this.route.queryParamMap.subscribe(params => {
      this.userId = params.get('userid');
      console.log('UserID reçu depuis les query parameters:', this.userId);
    });
  if(this.userId)
  {
    this.userService.getUserById(this.userId).subscribe(data=>
      this.fullname= data.lastname +' '+ data.firstname 
    )
    this.getAllAppointmentsByUserId(this.userId)
   
  }
  if( this.userId)
    {
      this.getAllAnalysesByUserId(this.userId)
    
    }
    this.getRegimesByUserIdAndStatusFalse(this.userId||'')
    this.getRegimesByUserIdAndStatusTrue(this.userId||'');
    console.log('userrrrrrrrr',this.userId||'')
    console.log("this.getRegimesByUserIdAndStatusTrue",this.getRegimesByUserIdAndStatusTrue(this.userId||''))
    this.getAllRegimes();

    this.getAllActivitesByUserId(this.userId||'');
    // if(this.role="Patient"){
    //     this.getRegimesByUserIdAndStatusTrue(this.userId||'');
    //     console.log("this.getRegimesByUserIdAndStatusTrue",this.getRegimesByUserIdAndStatusTrue(this.userId||''))

    //     this.getAllRegimes();
    // }else{
    //     this.getAllRegimes();
    // }


    this.getAllActivities(); 
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
      },      eventClick: this.handleEventClick.bind(this) // Ajout du gestionnaire de clics

    };
  }
  alertVisible: boolean = false;
  alertTitle: string = '';
  alertMessage: string = '';

  handleEventClick(info: any): void {
    const event = info.event;
    const eventDetails = {
      title: event.title,
      start: event.startStr,
      end: event.endStr
    };
    this.alertTitle = 'Détails du rendez-vous';
    this.alertMessage = `Titre: ${eventDetails.title}<br>Date de début: ${eventDetails.start}<br>Date de fin: ${eventDetails.end}`;
    this.alertVisible = true;
  }closeAlert(): void {
    this.alertVisible = false;
  }
  getAllAppointmentsByUserId(userId:any)
  {
  this.appointmentServiceService.getAllAppointmentsByUserId(userId).subscribe(data=>
  {
    this.events = this.formatEvents(data.filter((rdv:Appointment) => rdv.accepted))
    this.calendarOptions = {
      ...this.calendarOptions, // Copie les options actuelles
      events: [...this.events] // Met à jour la liste des événements
    };
  }
  )}
  // Méthode pour obtenir les mois contenant des événementsfoni
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
      width: '400px',
      data: this.fullname
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
          accepted: true,
          name: ''
        });
        console.log(this.events)
        this.calendarOptions = {
          ...this.calendarOptions, 
          events: [...this.events] 
        };
        let appointment=new Appointment()
        appointment.userId=this.userId|| ''
        appointment.horaireDebut=result.horaireDebut
        appointment.horaireFin=result.horaireFin
        appointment.date=result.date
        appointment.name=this.fullname
          console.log(appointment)

    if(this.userId)
    {
      this.appointmentServiceService.saveAppointment(appointment).subscribe(data=>

        console.log(data)
      )
    }      

  }})
    
  }



  getAllRegimes(): void {
    this.regimeService.getAllRegimes().subscribe((data: Regime[]) => {
      this.regimes = data;
      this.updateSelectedRegime();
    });
  }
   listRegime:Regime[]=[]
  getRegimesByUserIdAndStatusFalse(userId:string): void {
    
    this.regimeService.getRegimesByUserIdAndStatus(userId,false).subscribe((data: Regime[]) => {
      
      this.listRegime = data;
          console.log('listRegimeFalse',data)
 

    });
  }
  getRegimesByUserIdAndStatusTrue(userId:string): void {
    this.regimeService.getRegimesByUserIdAndStatus(userId,true).subscribe((data: Regime[]) => {
      
          console.log('regimesTrue',data)
          this.selectedRegimeId=data[0].id
          this.selectedRegime = data[0];  

    });
  }

  getAllActivities(): void {
    this.activityService.getAllActivities().subscribe((data: Activity[]) => {
      this.activities = data;
      console.log('this.activities',this.activities)
    });
  }

  updateSelectedRegime(): void {
    if (this.selectedRegimeId) {
      console.log(this.selectedRegime,this.selectedRegimeId)
      this.selectedRegime = this.regimes.find(r => r.id === this.selectedRegimeId) || null;
    }

  }

  updateSelectedActivity(): void {
    if (this.selectedActivityId) {
      this.selectedActivity = this.activities.find(a => a.id === this.selectedActivityId) || null;
    }
  }

  onSelectRegime(): void {
    if (this.selectedRegimeId ) {
        this.selectedRegime = this.regimes.find(r => r.id === this.selectedRegimeId) || null;
        console.log('this.selectedRegimeId',this.selectedRegimeId)
              if(this.selectedRegime){
                this.selectedRegime.userId =this.userId || '';
                this.selectedRegime.status=true
                this.regimeService.createRegime(this.selectedRegime).subscribe((addedRegime:any)=>{
                console.log('selectedRegime',this.selectedRegime);
              console.log('addedRegime',addedRegime);
              this.selectedRegimeId=addedRegime.id
              this.getRegimesByUserIdAndStatusFalse(this.userId || '')
              });
              }
                    this.updateSelectedRegime();
                                }
}

  onSelectActivity(): void {
    if (this.selectedActivityId) {
      this.selectedActivity = this.activities.find(r => r.id === this.selectedActivityId) || null;
      console.log('this.selectedActivityId',this.selectedActivityId)
      if(this.selectedActivity){

        this.userIds.push(this.userId||'')
        this.selectedActivity.userIds=this.userIds
        
        this.activityService.saveActivity(this.selectedActivity).subscribe((addedActivity:any)=>{
          console.log('addedActivity',this.selectedActivity);
        console.log('addedActivity',addedActivity);
        this.selectedActivityId=addedActivity.id
        this.getAllActivitesByUserId(this.userId);
        });
      }

    }
  }

  deleteActivity(Activity:any): void {
if (Activity) {
  console.log('this.selectedActivity',Activity)
  //this.selectedActivity.userId = '';
  

  const indexToRemove = Activity.userIds.indexOf(this.userId); // Trouver l'index de l'élément à supprimer

  if (indexToRemove !== -1) {
    Activity.userIds.splice(indexToRemove, 1); // Supprimer l'élément à cet index
  }
  console.log('userId', this.userId);
  console.log('indexToRemove', indexToRemove);
  console.log('this.selectedActivity after change', Activity);
  this.activityService.saveActivity(Activity).subscribe((updateActivity: any) => {
        console.log('Activity removed:', updateActivity);
        this.getAllActivitesByUserId(this.userId)
      });
    }
  }
  toggleRegimeStatus(regimeId: number): void {
    this.regimeService.toggleStatus(regimeId).subscribe(
      (response) => {
        this.selectedRegime=null
        this.selectedRegimeId=null
        console.log('Status toggled:', response);
        this.getRegimesByUserIdAndStatusFalse(this.userId||'')
      },
      (error) => {
        console.error('Error toggling status:', error);
      }
    );
  }
  getUserRole(): string | null {
    const roles = localStorage.getItem('roles');
    if (roles) {
      const parsedRoles = JSON.parse(roles);
      // Vérifier si "Patient" est dans les rôles
      if (parsedRoles.includes('Patient')) {
        return 'Patient';
      }
    }
    return null;
  }
  listavtivities:Activity[]=[]
  getAllActivitesByUserId(userId:any): void {

    this.activityService.getActivitesByUserId(userId).subscribe(
      (data) => {
        this.selectedActivity = data[0];
        this.listavtivities=data
        console.log('Activités récupérées:', this.selectedActivity);
        console.log('data récupérées:', data);
      },
      (error) => {
        console.error('Erreur lors de la récupération des activités:', error);
      }
    );
  }
}
