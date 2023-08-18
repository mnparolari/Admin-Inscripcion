import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Course } from '../../models/course';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { selectAuthIsAdmin } from 'src/app/store/auth/auth.selectors';

@Component({
  selector: 'app-courses-table',
  templateUrl: './courses-table.component.html',
  styleUrls: ['./courses-table.component.scss']
})
export class CoursesTableComponent {

  displayedColumns: string[] = ['icon', 'name', 'category', 'commission', 'teacher', 'courseFrom', 'courseTo', 'actions'];
  public admin$: Observable<boolean>;

  constructor(private store: Store) {
    this.admin$ = this.store.select(selectAuthIsAdmin)
  };

  @Input()
  dataSource: Course[] = [];

  @Output()
  deleteCourse = new EventEmitter<Course>();

  @Output()
  editCourse = new EventEmitter<Course>();
}
