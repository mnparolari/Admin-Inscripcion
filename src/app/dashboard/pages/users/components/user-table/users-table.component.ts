import { Component, Input, Output, EventEmitter } from '@angular/core';
import { User } from '../../models/user';

@Component({
  selector: 'app-user-table',
  templateUrl: './users-table.component.html',
  styleUrls: ['./users-table.component.scss']
})
export class UserTableComponent {
  displayedColumns: string[] = ['id', 'fullName', 'phone', 'email', 'password', 'userType', 'actions'];

  @Input()
  dataSource: User[] = [];

  @Output()
  deleteUser = new EventEmitter<User>();

  @Output()
  editUser = new EventEmitter<User>();

}


