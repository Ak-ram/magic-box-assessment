import { Component, inject, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
@Component({
  selector: 'landing',
  templateUrl: './landing.component.html',
  standalone: true,
})
export default class LandingComponent implements OnInit {
  // injection list
  private readonly authService: AuthService = inject(AuthService);
  private readonly router: Router = inject(Router);

  ngOnInit() {
    this.authService.login().subscribe(res=>{
      console.log('auth', res);
      setTimeout(()=>{
      this.authService.getUserProfile(res.accessToken).subscribe((res) => console.log(res));
      }, 2000)
    });

  }

  goToPurchase() {
    this.router.navigate(['/purchase']);
  }
}
