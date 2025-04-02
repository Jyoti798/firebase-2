import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/auth/service/auth.service';
import { ManageService } from 'src/app/auth/service/manage.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit, OnDestroy {
  isAuthenticated = false;
  isAdmin = false;
  userName: string | null = null;
  private userSubscription: Subscription | null = null;

  constructor(private manageService: ManageService, private authService: AuthService, private router: Router) {}

  ngOnInit() {
    this.userSubscription = this.manageService.user$.subscribe((user) => {
      this.isAuthenticated = !!user;
      this.userName = user?.name || null;
      this.isAdmin = user?.type === 'admin';
    });
  }

  onLogout() {
    this.manageService.logout();
    this.router.navigate(['/login']);
  }

  ngOnDestroy() {
    this.userSubscription?.unsubscribe(); // Prevent memory leaks
  }
}
