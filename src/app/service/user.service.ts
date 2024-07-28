import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { User } from '../class/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  

  private apiUrl = environment.urlBack + '/keycloak/users';
 

  constructor(private httpClient: HttpClient) { }

  getAllUsersStatusFalse(): Observable<User[]> {
    return this.httpClient.get<User[]>(`${this.apiUrl}/`)
      
  }
  saveUser(userData: any): Observable<any> {
    console.log('user Before save in bd',userData);
    return this.httpClient.post(`${this.apiUrl}/create`, userData);
  }
  updateUser(userData: any) {
    const url = `${this.apiUrl}/update`; 
    return this.httpClient.post(url, userData);
  }
  deleteUser(id: any) {
    return this.httpClient.delete(`${this.apiUrl}/` + id);
  }

  getUserById(id: String): Observable<User>{
    return this.httpClient.get<User>(`${this.apiUrl}/${id}`);
  }
  
  

  toggleUserAccountEnabled(id: String): Observable<User>{
    return this.httpClient.post<User>(`${this.apiUrl}/toggleUserEnabled/${id}`,null);
  }
}
