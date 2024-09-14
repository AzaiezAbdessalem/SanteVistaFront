import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Regime } from '../class/regime';
import { environment } from 'src/environments/environment';
import { Analyse } from '../class/analyse';

@Injectable({
  providedIn: 'root'
})
export class RegimeService {
  private urlBack=environment.urlBack;
  private apiUrl = this.urlBack+'/SanteVista/regime';
  private apiUrlAnalyse = this.urlBack+'/SanteVista/analyse';

 
  constructor(private http: HttpClient) {}
  createAnalyse(analyse: Analyse, selectedFile: File): Observable<Analyse> {
    const formData: FormData = new FormData();
    formData.append('file', selectedFile);
  
    // Ajouter les propriétés de l'objet `analyse` individuellement dans le formData
    formData.append('analyse', new Blob([JSON.stringify(analyse)], {
      type: 'application/json'
    }));
  
    return this.http.post<Analyse>(this.apiUrlAnalyse, formData);
  }
  
  getAllAnalyses(userId:string): Observable<Analyse[]> {
    return this.http.get<Analyse[]>(`${this.apiUrlAnalyse}/${userId}`);
  }
  contenuAnalyse(imageUrl: string): Observable<Blob> {
    const params = new HttpParams().set('imageUrl', imageUrl);
    return this.http.get(`${this.apiUrlAnalyse}/files`, { params, responseType: 'blob' });
  }
  
  
  
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