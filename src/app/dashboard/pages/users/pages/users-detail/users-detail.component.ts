import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserServiceService } from '../../services/users.service';
import { Users } from '../../models/user';

@Component({
  selector: 'app-users-detail',
  templateUrl: './users-detail.component.html',
  styles: [
  ]
})
export class UsersDetailComponent {

  public user?: Users | null = null;
  public userId?: number;

  constructor(private activatedRoute: ActivatedRoute, private userService: UserServiceService, private router: Router) {
    if (!Number(this.activatedRoute.snapshot.paramMap.get('id'))) {
      this.router.navigate(['dashboard', 'users']);
    } else {
      this.userId = Number(this.activatedRoute.snapshot.paramMap.get('id'));
      this.userDetail();
    }
  }

  userDetail(): void {
    if (this.userId) {
      this.userService.getUserById(this.userId).subscribe({
        next: (user) => (this.user = user),
      })
    }
  }
}
