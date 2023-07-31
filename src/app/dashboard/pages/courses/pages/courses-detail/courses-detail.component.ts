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
  public courseCommission?: number;

  constructor(private activatedRoute: ActivatedRoute, private coursesService: CoursesService, private router: Router) {
    if (!Number(this.activatedRoute.snapshot.paramMap.get('commission'))) {
      this.router.navigate(['dashboard', 'courses']);
    } else {
      this.courseCommission = Number(this.activatedRoute.snapshot.paramMap.get('commission'));
      this.userDetail();
    }
  };

  userDetail(): void {
    if (this.courseCommission) {
      this.coursesService.getCourseByCommission(this.courseCommission).subscribe({
        next: (course) => (this.course = course),
      })
    }
  };
}
