import { Injectable } from '@angular/core';
import {
  CanLoad,
  CanActivate,
  Route,
  UrlSegment,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  UrlTree,
  Router
} from '@angular/router';
import { Observable } from 'rxjs';
import { Select } from '@ngxs/store';
import { AuthState } from '@ccal-apps/core';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanLoad, CanActivate {

  @Select(AuthState.isAuthenticated)
  isAuthenticated$: Observable<boolean>;

  constructor(private router: Router) { }

  checkAuthentication() {
    let authenticated;

    this.isAuthenticated$.subscribe(isAuth => {
      authenticated = isAuth;
    })

    if (!authenticated) {
      this.router.navigateByUrl('/unauthorized');
    }
    return authenticated;
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.checkAuthentication();
  }

  canLoad(
    route: Route,
    segments: UrlSegment[]): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.checkAuthentication();
  }
}
