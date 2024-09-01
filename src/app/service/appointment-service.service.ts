import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

import { Observable } from 'rxjs';
import { Appointment } from '../class/Appointment';
@Injectable({
  providedIn: 'root'
})
export class AppointmentServiceService {

  private apiUrl = environment.urlBack + '/SanteVista/rendezVous';
 

  constructor(private httpClient: HttpClient) { }

  getAllAppointmentsByUserId(userId: string): Observable<Appointment[]> {
    return this.httpClient.get<Appointment[]>(`${this.apiUrl}/allAppointments/${userId}`)
      
  }
  getAllAppointments(): Observable<Appointment[]> {
    return this.httpClient.get<Appointment[]>(`${this.apiUrl}`)
      
  }
  AcceptedRendezVous(id: number): Observable<Appointment> {
    return this.httpClient.post<Appointment>(`${this.apiUrl}/${id}`, null);
  }
  saveAppointment(appointment: Appointment): Observable<Appointment> {
    console.log('activity Before save in bd',appointment);
    return this.httpClient.post<Appointment>(`${this.apiUrl}`, appointment);
  }
}