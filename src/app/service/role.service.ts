import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Role } from '../class/role';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RoleService {

  private apiUrl = environment.urlBack + '/keycloak/roles';

  constructor(private httpClient: HttpClient) { }

  getAllRolesStatusFalse(): Observable<Role[]> {
    return this.httpClient.get<Role[]>(`${this.apiUrl}/statusFalse`)
  }

  createRole(role: any): Observable<any> {
    return this.httpClient.post<any>(`${this.apiUrl}/`, role);
  }
  updateRole(id: number, roleData: any) {
    const url = `${this.apiUrl}/${id}/update`; 
    return this.httpClient.post(url, roleData);
  }
  desactiverRole(id: number): Observable<any> {
    const url = `${this.apiUrl}/${id}`;
   return this.httpClient.put<any>(url, {});
  }
  getRoleById(id: any): Observable<Role>{
    return this.httpClient.get<Role>(`${this.apiUrl}/${id}`);
  }
  getRoleByName(name: any): Observable<any>{
    return this.httpClient.get<Role>(`${this.apiUrl}/byName/${name}`);
  }


}
