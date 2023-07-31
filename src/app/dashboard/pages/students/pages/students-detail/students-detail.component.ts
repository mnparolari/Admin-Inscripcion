import { Component } from '@angular/core';
import { Students } from '../../models/students';
import { ActivatedRoute, Router } from '@angular/router';
import { StudentsService } from '../../services/students.service';

@Component({
  selector: 'app-students-detail',
  templateUrl: './students-detail.component.html',
  styleUrls: ['./students-detail.component.scss']
})
export class StudentsDetailComponent {
  public student?: Students | null = null;
  public studentId?: number;
  public selectedImage: File | null = null;

  constructor(private activatedRoute: ActivatedRoute, private studentService: StudentsService, private router: Router) {
    if (!Number(this.activatedRoute.snapshot.paramMap.get('id'))) {
      this.router.navigate(['dashboard', 'students']);
    } else {
      this.studentId = Number(this.activatedRoute.snapshot.paramMap.get('id'));
      this.userDetail();
    }
  };

  userDetail(): void {
    if (this.studentId) {
      this.studentService.getStudentById(this.studentId).subscribe({
        next: (student) => (this.student = student),
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
