import { Component, Input, Output, EventEmitter, ViewChild } from '@angular/core';
import { MatTable } from '@angular/material/table';
import { Users } from '../../models/user';

@Component({
  selector: 'app-user-table',
  templateUrl: './user-table.component.html',
  styleUrls: ['./user-table.component.scss']
})
export class UserTableComponent {
  displayedColumns: string[] = ['id', 'name', 'surname', 'phone', 'email', 'password', 'userType', 'actions'];
  
  @Input()
  dataSource: Users[] = [];

  @Output()
  deleteUser = new EventEmitter<Users>();

  @Output()
  editUser = new EventEmitter<Users>();
}

  /*@ViewChild(MatTable) table: MatTable<PeriodicElement>;

  addData() {
    const randomElementIndex = Math.floor(Math.random() * ELEMENT_DATA.length);
    this.dataSource.push(ELEMENT_DATA[randomElementIndex]);
    this.table.renderRows();
  }

  removeData() {
    this.dataSource.pop();
    this.table.renderRows();
  }*/

