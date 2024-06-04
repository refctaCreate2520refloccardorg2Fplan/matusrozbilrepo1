import { Component, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { MatToolbar } from '@angular/material/toolbar';
import { MatButton } from '@angular/material/button';
import { AuthenticationService } from '../api-authorization/authentication.service';
import { CommonModule, NgIf } from '@angular/common';
import { Subject, Subscription, takeUntil, timer } from 'rxjs';

@Component({
  selector: 'app-main-nav',
  standalone: true,
  imports: [
    RouterLink,
    CommonModule,
    MatToolbar,
    MatButton,
    NgIf
  ],
  templateUrl: './main-nav.component.html',
  styleUrl: './main-nav.component.css'
})
export class MainNavComponent {
  authService = inject(AuthenticationService);
  private router = inject(Router);

  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }


  time = new Date();
  private destroy$ = new Subject<void>();
  timeSubscription: Subscription;
  ngOnInit() {
    const timeSource = timer(0, 1000);
    this.timeSubscription = timeSource.pipe(
      takeUntil(this.destroy$)
    ).subscribe(() => {
      this.time = new Date();
    });
  }


  ngOnDestroy() {
    if (this.timeSubscription) {
      this.timeSubscription.unsubscribe();
    }
  }
}
