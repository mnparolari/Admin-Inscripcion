import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CoursesService } from '../../services/courses.service';
import { Courses } from '../../models/courses';

@Component({
  selector: 'app-courses-detail',
  templateUrl: './courses-detail.component.html',
  styleUrls: ['./courses-detail.component.scss']
})
export class CoursesDetailComponent {
  public course?: Courses | null = null;
  public courseId?: number;

  constructor(private activatedRoute: ActivatedRoute, private coursesService: CoursesService, private router: Router) {
    if (!Number(this.activatedRoute.snapshot.paramMap.get('id'))) {
      this.router.navigate(['dashboard', 'courses']);
    } else {
      this.courseId = Number(this.activatedRoute.snapshot.paramMap.get('id'));
      this.userDetail();
    }
  };

  userDetail(): void {
    if (this.courseId) {
      this.coursesService.getCourseById(this.courseId).subscribe({
        next: (course) => (this.course = course),
      })
    }
  };
}
