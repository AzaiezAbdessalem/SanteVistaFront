import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-rendez-vous',
  templateUrl: './rendez-vous.component.html',
  styleUrls: ['./rendez-vous.component.css']
})
export class RendezVousComponent implements OnInit {
  rendezVous = {
    date: '',
    horaireDebut: '',
    horaireFin: ''
  };

  constructor() { }

  ngOnInit(): void {
  }

  onSubmit(): void {
    console.log(`Rendez-vous scheduled on ${this.rendezVous.date} from ${this.rendezVous.horaireDebut} to ${this.rendezVous.horaireFin}`);
    // Add your appointment scheduling logic here
  }
}
