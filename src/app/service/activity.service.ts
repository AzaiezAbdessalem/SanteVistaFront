import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

import { Observable } from 'rxjs';
import { Activity } from '../class/activity';

@Injectable({
  providedIn: 'root'
})
export class ActivityServiceService {

  private apiUrl = environment.urlBack + '/SanteVista/activitePhysique';
 

  constructor(private httpClient: HttpClient) { }

  getAllActivities(): Observable<Activity[]> {
    return this.httpClient.get<Activity[]>(`${this.apiUrl}`)
      
  }

  saveActivity(activityData: any): Observable<any> {
    console.log('activity Before save in bd',activityData);
    return this.httpClient.post(`${this.apiUrl}`, activityData);
  }

  updateActivity(id:number,activityData: any): Observable<any> {
    const url = `${this.apiUrl}/` + id; 
    return this.httpClient.put(url, activityData);
  }

  deleteActivity(id: number) {
    return this.httpClient.delete(`${this.apiUrl}/` + id);
  }

  getActivityById(id: Number): Observable<Activity>{
    return this.httpClient.get<Activity>(`${this.apiUrl}/${id}`);
  }
  getActivitesByUserId(userId: string): Observable<any> {
    return this.httpClient.get(`${this.apiUrl}/user/${userId}`);
  }
}
