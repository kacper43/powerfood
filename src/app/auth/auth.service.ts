import { Injectable } from '@angular/core';
import { User } from './user.model';
import { AuthData } from './auth-data.model';

import { Subject } from 'rxjs';
import { Router } from '@angular/router';
import { AngularFireAuth } from 'angularfire2/auth';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  authChange = new Subject<boolean>();
  private isAuthenticated = false;

  constructor(private router: Router, private afAuth: AngularFireAuth) { }

  registerUser(authData: AuthData) {
    this.afAuth.auth.createUserWithEmailAndPassword(authData.email, authData.password).then( result => {
      // console.log(result);
      this.isAuthenticated = true;
      this.authChange.next(true);
      this.router.navigate(['/orders']);
    });
  }

  login(authData: AuthData) {
    this.afAuth.auth.signInWithEmailAndPassword(authData.email, authData.password).then( result => {
      // console.log(result);
      this.isAuthenticated = true;
      this.authChange.next(true);
      this.router.navigate(['/orders']);
      localStorage.setItem('loggedUser', authData.email);
    });


  }

  logout() {
    this.afAuth.auth.signOut();
    this.isAuthenticated = false;
    this.authChange.next(false);
    this.router.navigate(['/login']);
    localStorage.removeItem('loggedUser');
  }



  isAuth() {
    return this.isAuthenticated !== false;
  }
}
