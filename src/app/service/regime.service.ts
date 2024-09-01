import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Regime } from '../class/regime';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RegimeService {
  private urlBack=environment.urlBack;
  private apiUrl = this.urlBack+'/SanteVista/regime';

 
  constructor(private http: HttpClient) {}

  getAllRegimes(): Observable<Regime[]> {
    return this.http.get<Regime[]>(this.apiUrl);
  }

  getRegimeById(id: number): Observable<Regime> {
    return this.http.get<Regime>(`${this.apiUrl}/${id}`);
  }

  createRegime(regime: Regime): Observable<Regime> {
    return this.http.post<Regime>(this.apiUrl, regime);
  }

  updateRegime(id: number, regime: Regime): Observable<Regime> {
    return this.http.put<Regime>(`${this.apiUrl}/${id}`, regime);
  }

  deleteRegime(id: any): Observable<void> {
    console.log("hahahahahah"+id)
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
  getRegimesByUserIdAndStatus(userId: string,status:boolean): Observable<Regime[]> {
    return this.http.get<Regime[]>(`${this.apiUrl}/status/${userId}/${status}`);
  }
  toggleStatus(id: number): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}/toggleStatus`, {});
  }
}