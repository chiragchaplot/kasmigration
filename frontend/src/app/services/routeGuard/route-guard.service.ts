import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Router } from '@angular/router';
import jwtDecode from 'jwt-decode';
import { GlobalConstants } from 'src/app/shared/global-constants';
import { AuthService } from '../auth/auth.service';
import { SnackbarService } from '../snackbar/snackbar.service';

@Injectable({
  providedIn: 'root'
})
export class RouteGuardService {

  constructor(public auth: AuthService,
    public router: Router,
    public snackBarService: SnackbarService) { }

  canActivate(route: ActivatedRouteSnapshot): boolean {
    let expectedRoleArray = route.data;
    expectedRoleArray = expectedRoleArray.expectedRole;
    const token: any = localStorage.getItem('token');
    var tokenPayload: any;
    try {
      tokenPayload = jwtDecode(token);
      console.log(tokenPayload.role + " logged in");
    } catch (err) {
      localStorage.clear();
      this.router.navigate(['/']);
    }

    let checkRole = false;

    for (let i =0; i<expectedRoleArray.length;i++) {
      if (expectedRoleArray[i] == tokenPayload.role) {
        checkRole = true;
      }
    }

    if (tokenPayload.role == 'admin' || tokenPayload.role == 'consultant' || tokenPayload.role == 'student') {
      if (this.auth.isAuthenticated() && checkRole) {
        return true;
      }
      this.snackBarService.openSnackBar(GlobalConstants.unauthorised, GlobalConstants.error);
      this.router.navigate(['/cafe/dashboard']);
      return false;
    } else {
      this.router.navigate(['/']);
      localStorage.clear();
      return false;
    }
  }
}
