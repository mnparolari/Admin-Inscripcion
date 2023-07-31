import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Students } from '../../models/students';

@Component({
  selector: 'app-students-table',
  templateUrl: './students-table.component.html',
  styleUrls: ['./students-table.component.scss']
})
export class StudentsTableComponent {
  displayedColumns: string[] = ['id', 'fullName', 'phone', 'email', 'password', 'actions'];

  @Input()
  dataSource: Students[] = [];

  @Output()
  deleteStudent = new EventEmitter<Students>();

  @Output()
  editStudent = new EventEmitter<Students>();
}
