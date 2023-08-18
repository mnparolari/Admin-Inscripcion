import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserServiceService } from '../../services/users.service';
import { User } from '../../models/user';
import { Subscription } from 'rxjs';
import { SpinnerService } from 'src/app/core/services/spinner.service';
import { NotifierService } from 'src/app/core/services/notifier.service';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.scss']
})
export class UserDetailComponent implements OnInit, OnDestroy {

  public user?: User | null = null;
  public userId?: number;
  public selectedImage: string = '';
  showSpinner = true;
  private subscription!: Subscription;

  constructor(private activatedRoute: ActivatedRoute, private userService: UserServiceService, private router: Router, private spinner: SpinnerService, private notifier: NotifierService) {
    if (!Number(this.activatedRoute.snapshot.paramMap.get('id'))) {
      this.router.navigate(['dashboard', 'users']);
    } else {
      this.userId = Number(this.activatedRoute.snapshot.paramMap.get('id'));
      this.userDetail();
    }
  };

  ngOnInit(): void {
    this.subscription = this.spinner.getSpinner().subscribe((show: boolean) => {
      this.showSpinner = show;
    });
    this.spinner.show();
    this.userDetail()
    this.spinner.hide();
  };

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  };

  userDetail(): void {
    if (this.userId) {
      this.userService.getUserById(this.userId).subscribe({
        next: (user) => {
          this.user = user;
          if (user) {
            this.selectedImage = user.img;
          }
        }
      })
    }
  };

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input?.files && input.files.length > 0) {
      const file = input.files[0];

      const reader = new FileReader();
      reader.onload = (e) => {
        if (this.user) {
          this.user.img = e.target?.result as string;
          this.selectedImage = this.user.img;
          this.saveUserImage();
        }
      };
      reader.readAsDataURL(file);
    }
  };


  saveUserImage(): void {
    if (this.userId !== undefined) {
      this.userService.updateUserImage(this.userId, this.selectedImage)
        .subscribe(
          () => {
            this.notifier.showSucces('Imagen cargada correctamente', 'Esta será la foto de perfil.');
          },
          () => {
            this.notifier.showError('Error', 'No se pudo cargar la imagen solicitada. Volvé a intentar.');
          }
        );
    }
  }

  getImageUrl(): string {
    if (this.selectedImage) {
      return this.selectedImage;
    }
    return '';
  };
}
