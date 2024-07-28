import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, UrlTree } from '@angular/router';
import { Observable, of } from 'rxjs';
import { switchMap, map } from 'rxjs/operators';
import { AuthService } from '../service/auth.service';
@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  canActivate(route: ActivatedRouteSnapshot):boolean {
    const path = route.url.map(segment => segment.path).join('/');
    console.log("path",path)

          return(this.authService.isAuthenticatedUser())
   
        // if () {
        //   return true ;
        // } else {
        //   return of(this.router.createUrlTree(['/login'])); // Envelopper la valeur dans un observable
        // }
      
    
  }

  // hasSufficientPermissions(path: string): Observable<boolean | UrlTree> {
  //   const userId = localStorage.getItem('userId');
  //   if (staticAccess.includes(path)) {
  //     return new Observable<boolean | UrlTree>((observer) => {
  //       observer.next(true);
  //       observer.complete();
  //     });
  //   }

  //   return this.accessService.getAccessbyUser(userId).pipe(
  //     map((accessList: Access[]) => {
  //       const hasPermissions = accessList.some(access =>
  //         access.subAccess.some(subAccess => subAccess.path === path)
  //       );

  //       if (hasPermissions) {
  //         return true;
  //       } else {
  //         return this.router.createUrlTree(['/']);
  //       }
  //     })
  //   );
  // }

  
}
