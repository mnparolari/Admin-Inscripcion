import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CoursesService } from '../../services/courses.service';
import { Course } from '../../models/course';
import { Subscription } from 'rxjs';
import { SpinnerService } from 'src/app/core/services/spinner.service';

@Component({
  selector: 'app-courses-detail',
  templateUrl: './courses-detail.component.html',
  styleUrls: ['./courses-detail.component.scss']
})
export class CoursesDetailComponent implements OnInit, OnDestroy {
  public course?: Course | null = null;
  public courseId?: number;
  showSpinner = true;
  private subscription!: Subscription;

  constructor(private activatedRoute: ActivatedRoute, private coursesService: CoursesService, private router: Router, private spinner: SpinnerService) {
    if (!Number(this.activatedRoute.snapshot.paramMap.get('id'))) {
      this.router.navigate(['dashboard', 'courses']);
    } else {
      this.courseId = Number(this.activatedRoute.snapshot.paramMap.get('id'));
      this.courseDetail();
    }
  };

  ngOnInit(): void {
    this.subscription = this.spinner.getSpinner().subscribe((show: boolean) => {
      this.showSpinner = show;
    });
    this.spinner.show();
    this.courseDetail();
    this.spinner.hide();
  };

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  };

  courseDetail(): void {
    if (this.courseId) {
      this.coursesService.getCourseById(this.courseId).subscribe({
        next: (course) => {
          this.course = course;
        }
      })
    }
  };
}
