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

@Component({
  selector: 'app-fiche-desuivi',
  templateUrl: './fiche-desuivi.component.html',
  styleUrls: ['./fiche-desuivi.component.css']
})
export class FicheDesuiviComponent implements OnInit {
  userId: string | null = null;
  User: User | null = null;
  regimes: Regime[] = [];
  selectedRegime: Regime | null = null;
  selectedRegimeId: number | null = null;
  activities: Activity[] = [];
  selectedActivity: Activity | null = null;
  selectedActivityId: number | null = null;

  constructor(private userService: UserService, private route: ActivatedRoute, private regimeService: RegimeService,private activityService:ActivityServiceService) {}

  // Liste des événements
  events = [
    {
      title: 'Rendez-vous 1',
      start: '2024-08-12T10:30:00',
      end: '2024-08-12T11:00:00'
    },
    {
      title: 'Rendez-vous 2',
      start: '2024-09-15T14:00:00',
      end: '2024-08-15T15:00:00'
    },
    {
      title: 'Rendez-vous 3',
      start: '2024-08-20T09:00:00',
      end: '2024-08-20T10:00:00'
    }
  ];


  calendarOptions: any;

  ngOnInit(): void {

    this.userId = this.route.snapshot.paramMap.get('id');
    console.log(this.userId);

    if (this.userId) {
      this.userService.getUserById(this.userId).subscribe((result: User) => {
        this.User = result;
        this.selectedRegimeId = result.idRegime;

        this.selectedActivityId = result.idActivity;
        this.updateSelectedRegime();

        this.updateSelectedActivity();
        console.log(result);
      });
    }
    this.getAllRegimes();
    this.getAllActivities();
    
    this.getAllRegimes();    const monthsWithEvents = this.getMonthsWithEvents(this.events);

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
  AddRendezVous()
  {}



  getAllRegimes(): void {
    this.regimeService.getAllRegimes().subscribe((data: Regime[]) => {
      this.regimes = data;
      this.updateSelectedRegime();
    });
  }

  getAllActivities(): void {
    this.activityService.getAllActivities().subscribe((data: Activity[]) => {
      this.activities = data;
      this.updateSelectedActivity();
    });
  }

  updateSelectedRegime(): void {
    if (this.selectedRegimeId) {
      this.selectedRegime = this.regimes.find(r => r.id === this.selectedRegimeId) || null;
    }

  }

  updateSelectedActivity(): void {
    if (this.selectedActivityId) {
      this.selectedActivity = this.activities.find(a => a.id === this.selectedActivityId) || null;
    }
  }

  onSelectRegime(): void {
    if (this.selectedRegimeId && this.User) {
      this.User.idRegime = this.selectedRegimeId;
      this.userService.updateUser(this.User).subscribe((updatedUser: any) => {
        this.User = updatedUser;
        this.updateSelectedRegime();
        console.log('Regime updated:', updatedUser);
      });
    }
  }

  onSelectActivity(): void {
    if (this.selectedActivityId && this.User) {
      this.User.idActivity = this.selectedActivityId;
      this.userService.updateUser(this.User).subscribe((updatedUser: any) => {
        this.User = updatedUser;
        this.updateSelectedActivity();
        console.log('Activity updated:', updatedUser);
      });
    }
  }

  deleteRegime(): void {
    if (this.User) {
      this.User.idRegime = null;
      this.userService.updateUser(this.User).subscribe((updatedUser: any) => {
        this.User = updatedUser;
        this.selectedRegime = null;
        this.selectedRegimeId = null;
        console.log('Regime removed:', updatedUser);
      });
    }
  }
  deleteActivity(): void {
    if (this.User) {
      this.User.idActivity = null;
      this.userService.updateUser(this.User).subscribe((updatedUser: any) => {
        this.User = updatedUser;
        this.selectedActivity = null;
        this.selectedActivityId = null;
        console.log('Activity removed:', updatedUser);
      });
    }
  }
}
