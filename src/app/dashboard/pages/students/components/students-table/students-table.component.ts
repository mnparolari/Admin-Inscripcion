import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Student } from '../../models/student';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { selectAuthIsAdmin } from 'src/app/store/auth/auth.selectors';

@Component({
  selector: 'app-students-table',
  templateUrl: './students-table.component.html',
  styleUrls: ['./students-table.component.scss']
})
export class StudentsTableComponent {
  displayedColumns: string[] = ['id', 'fullName', 'phone', 'email', 'password', 'actions'];
  public admin$: Observable<boolean>;

  constructor(private store: Store) {
    this.admin$ = this.store.select(selectAuthIsAdmin)
  }
  
  @Input()
  dataSource: Student[] = [];

  @Output()
  deleteStudent = new EventEmitter<Student>();

  @Output()
  editStudent = new EventEmitter<Student>();
}
