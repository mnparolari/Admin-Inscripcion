import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserServiceService } from '../../services/users.service';
import { Users } from '../../models/user';

@Component({
  selector: 'app-users-detail',
  templateUrl: './users-detail.component.html',
  styleUrls: ['./users-detail.component.scss']
})
export class UsersDetailComponent {

  public user?: Users | null = null;
  public userId?: number;
  public selectedImage: File | null = null;

  constructor(private activatedRoute: ActivatedRoute, private userService: UserServiceService, private router: Router) {
    if (!Number(this.activatedRoute.snapshot.paramMap.get('id'))) {
      this.router.navigate(['dashboard', 'users']);
    } else {
      this.userId = Number(this.activatedRoute.snapshot.paramMap.get('id'));
      this.userDetail();
    }
  };

  userDetail(): void {
    if (this.userId) {
      this.userService.getUserById(this.userId).subscribe({
        next: (user) => (this.user = user),
      })
    }
  };

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input?.files && input.files.length > 0) {
      this.selectedImage = input.files[0];
    }
  };
  
    getImageUrl(): string {
      if (this.selectedImage) {
        return URL.createObjectURL(this.selectedImage);
      }
      return '';
    };
}
