import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Users } from '../../models/user';


@Component({
  selector: 'app-user-table',
  templateUrl: './user-table.component.html',
  styleUrls: ['./user-table.component.scss']
})
export class UserTableComponent {
  displayedColumns: string[] = ['id', 'fullName', 'phone', 'email', 'password', 'userType', 'actions'];
  
  @Input()
  dataSource: Users[] = [];

  @Output()
  deleteUser = new EventEmitter<Users>();

  @Output()
  editUser = new EventEmitter<Users>();
}


