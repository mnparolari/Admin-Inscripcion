import { Component, OnDestroy, OnInit } from '@angular/core';
import { Student } from '../../models/student';
import { ActivatedRoute, Router } from '@angular/router';
import { StudentsService } from '../../services/students.service';
import { Observable, Subscription, tap } from 'rxjs';
import { SpinnerService } from 'src/app/core/services/spinner.service';
import { NotifierService } from 'src/app/core/services/notifier.service';
import { Store } from '@ngrx/store';
import { selectAuthIsAdmin } from 'src/app/store/auth/auth.selectors';

@Component({
  selector: 'app-students-detail',
  templateUrl: './students-detail.component.html',
  styleUrls: ['./students-detail.component.scss']
})
export class StudentsDetailComponent implements OnInit, OnDestroy {
  public student?: Student | null = null;
  public studentId?: number;
  public selectedImage: string = '';
  showSpinner = true;
  private subscription!: Subscription;
  public admin$: Observable<boolean>;

  constructor(private activatedRoute: ActivatedRoute, private studentService: StudentsService, private router: Router, private spinner: SpinnerService, private notifier: NotifierService, private store: Store) {
    if (!Number(this.activatedRoute.snapshot.paramMap.get('id'))) {
      this.router.navigate(['dashboard', 'students']);
    } else {
      this.studentId = Number(this.activatedRoute.snapshot.paramMap.get('id'));
      this.studentDetail();
    }
    this.admin$ = this.store.select(selectAuthIsAdmin)
  };

  ngOnInit(): void {
    this.subscription = this.spinner.getSpinner().subscribe((show: boolean) => {
      this.showSpinner = show;
    });
    this.spinner.show();
    this.studentDetail();
    this.spinner.hide();
  };

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  };

  studentDetail(): void {
    if (this.studentId) {
      this.studentService.getStudentById(this.studentId).subscribe({
        next: (student) => {
          this.student = student;
          if (student) {
            this.selectedImage = student.img;
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
        if (this.student) {
          this.student.img = e.target?.result as string;
          this.selectedImage = this.student.img;
          this.saveStudentImage();
        }
      };
      reader.readAsDataURL(file);
    }
  }

  saveStudentImage(): void {
    if (this.studentId !== undefined) {
      this.studentService.updateStudentImage(this.studentId, this.selectedImage)
        .pipe(
          tap(
            () => {
              this.notifier.showSucces('Imagen cargada correctamente', 'Esta será la foto de perfil.');
            },
            () => {
              this.notifier.showError('Error', 'No se pudo cargar la imagen solicitada. Volvé a intentar.');
            }
          )
        )
        .subscribe();
    }
  }


  getImageUrl(): string {
    if (this.selectedImage) {
      return this.selectedImage;
    }
    return '';
  }
}
