import { HttpClient, HttpHeaders, HttpParams, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Observable, Subject, catchError, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { User } from '../class/user';
import { Role } from '../class/role';



@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private urlBack=environment.urlBack;
private loginUrl=this.urlBack+'/keycloak/auth/login';
// url Recommendation
  private userId = localStorage.getItem('userId');
  private apiUrl = this.urlBack+'/keycloak/users/findById';
  private isAuthenticated = false;
  userSkills: string[] = [];
  skillsToLearn: string[] = [];
  recommendedCourses: any[] = [];

  private tokenExpirationTime = 30;


  constructor(private http: HttpClient,private router: Router,
    private jwtHelper: JwtHelperService,
) {
  
  }

  findAccount(email: string): Observable<HttpResponse<string>> {
    return this.http.get<string>(`${this.urlBack}/keycloak/auth/findAccount/${email}`, { observe: 'response', responseType: 'text' as 'json' });
  }
  verificationCode(email: string, code: string): Observable<HttpResponse<string>> {
   
    const params = new HttpParams()
      .set('email', email)
      .set('code', code);
  
    return this.http.post<string>(`${this.urlBack}/keycloak/auth/findAccount/verificationCode`, {}, { params, observe: 'response', responseType: 'text' as 'json' });
  }
  resetPassword(email: string  , password: string): Observable<any> {
  
    const params = new HttpParams()
      .set('email', email)
      .set('password', password);
  
    return this.http.post<any>(`${this.urlBack}/keycloak/auth/findAccount/restPassword`, {}, { params });
  }
  changePassword(username: string , currentPassword: string, newPassword: string):Observable<any>
  {
    return this.http.post(this.urlBack+'/keycloak/auth/changePassword', { username, currentPassword, newPassword})
  }

 


  login(username: string, password: string): Promise<boolean> {
    return this.http.post(this.loginUrl, { username, password }).toPromise()
      .then((response: any) => {
        console.log("Response login:", response);
        const accessToken = response.access_token;

        // Vérifiez si le token JWT est valide
        if (this.jwtHelper.isTokenExpired(accessToken)) {
          console.error('Token JWT expiré');
          return false;
        }

        // Décodez le token JWT pour accéder à ses données
        const decodedToken = this.jwtHelper.decodeToken(accessToken);

        // Récupérez les données nécessaires du token JWT
        const usernameFromToken = decodedToken.preferred_username;
        const userIdFromToken = decodedToken.sub;
        const roleFromToken = decodedToken.realm_access.roles;

        // Enregistrez les données dans le local storage
        localStorage.setItem('token', accessToken);
        localStorage.setItem('userId', userIdFromToken);
        localStorage.setItem('username', usernameFromToken);
        localStorage.setItem('roles', JSON.stringify(roleFromToken));

        return true;
      })
      .catch((error) => {
        console.error('Erreur lors de la récupération du token:', error);
        return false;
      });
  }

  
  logout(): void {
    // Perform any necessary cleanup or API calls to invalidate the session
    this.isAuthenticated = false;
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    localStorage.removeItem('username');
    localStorage.removeItem('userId');
    localStorage.removeItem('roles');

    this.router.navigate(['/login'])
  }

  isAuthenticatedUser(): boolean {
    const tk = localStorage.getItem('token');
    if (tk) {
      return (this.isAuthenticated = true);
    }

    return (this.isAuthenticated = false);
  }

  getUserById(): Observable<User> {
    const apiUrl = environment.urlBack+`/keycloak/users/findById/${this.userId}`;

    return this.http.get<User>(apiUrl);
  }
  register(user:User): Observable<User> {

    return this.http.post<User>(environment.urlBack+`/keycloak/auth/register`, user);
  }
 
  
}
