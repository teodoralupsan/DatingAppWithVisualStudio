import { Component, OnInit } from '@angular/core';
import { AuthService } from '../_services/auth.service';
import { AlertifyService } from '../_services/alertify.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {
  model: any = {};
  photoUrl: string;

  constructor(public authService: AuthService,
              private alerity: AlertifyService,
              private routes: Router) { }

  ngOnInit() {
    this.authService.currentPhotoUrl.subscribe(phUrl => this.photoUrl = phUrl);
  }

  login() {
    this.authService.login(this.model).subscribe(
      next => {
      this.alerity.success('Logged in successfully!');
    }, error => {
      this.alerity.error(error);
    }, () => {
      this.routes.navigate(['/members']);
    });
  }

  loggedIn() {
    return this.authService.loggedIn();
  }

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    this.authService.decodedToken = null;
    this.authService.currentUser = null;
    this.alerity.message('logged out');
    this.routes.navigate(['/home']);
  }

}
