import { Time } from "@angular/common";

export class Appointment {
     id!: number;
     title!:string
     name!:string
     userId!:string

     start!: string
     end!:string
     date!:Date
     horaireDebut!:Time;
     horaireFin!:Time;
     accepted!:boolean
  }
  