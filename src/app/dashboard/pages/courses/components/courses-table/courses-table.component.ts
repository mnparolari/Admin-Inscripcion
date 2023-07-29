import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Courses } from '../../models/courses';

@Component({
  selector: 'app-courses-table',
  templateUrl: './courses-table.component.html',
  styleUrls: ['./courses-table.component.scss']
})
export class CoursesTableComponent {
  
  displayedColumns: string[] = ['icon', 'name', 'category', 'commission', 'teacher', 'courseFrom', 'courseTo', 'actions'];

  @Input()
  dataSource: Courses[] = [];

  @Output()
  deleteCourse = new EventEmitter<Courses>();

  @Output()
  editCourse = new EventEmitter<Courses>();
}
