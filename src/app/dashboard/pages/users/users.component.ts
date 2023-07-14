import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { FormDialogComponent } from './components/user-form-dialog/form-dialog.component';
import { Users } from './models/user';

const USERS_DATA: Users[] = [
  {
    id: 1,
    name: 'Martin',
    surname: 'Parolari',
    phone: '1134629639',
    email: 'mnparolari@gmail.com',
    password: '123456',
    userType: 'Profesor'
  }
]

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent {

  public users: Users[] = USERS_DATA

  constructor(public dialog: MatDialog) { }

  onCreateUser(): void {
    this.dialog
      .open(FormDialogComponent)
      .afterClosed()
      .subscribe({
        next: (v) => {
          if (v) {
            this.users = [
              ...this.users,
              {
                id: this.users.length + 1,
                name: v.name,
                surname: v.surname,
                phone: v.phone,
                email: v.email,
                password: v.password,
                userType: v.userType
              },
            ];
            console.log('RECIBIMOS EL VALOR: ', v);
          }
        }
      });
  }

  onDeleteUser(userToDelete: Users): void {
    if (confirm(`¿Está seguro de eliminar el usuario de tipo ${userToDelete.userType}, registrado a nombre de ${userToDelete.name}, con el correo electrónico ${userToDelete.email}?`)) {
      this.users = this.users.filter((u) => u.id !== userToDelete.id);
    }
  }

  onEditUser(userToEdit: Users): void {
    this.dialog
      .open(FormDialogComponent, {
        data: userToEdit
      })
      .afterClosed()
      .subscribe({
        next: (userUpdated) => {
          this.users = this.users.map((user) => {
            return user.id === userToEdit.id ? { ...user, ...userUpdated } : user;
          })
        }
      })
  }
}
