import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { FormDialogComponent } from './components/user-form-dialog/form-dialog.component';
import { Users } from './models/user';
import Swal from 'sweetalert2';

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
          }
        }
      });
  }

  onDeleteUser(userToDelete: Users): void {
    Swal.fire({
      title: `¿Estás seguro que queres eliminar el usuario de tipo <span style = "color: #F44336">${userToDelete.userType}</span>, registrado a nombre de <span style = "color: #F44336">${userToDelete.name} ${userToDelete.surname}</span>, con el correo electrónico <span style = "color: #F44336">${userToDelete.email}</span>?`,
      text: 'Esta acción no se puede deshacer',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, eliminarlo',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.users = this.users.filter((u) => u.id !== userToDelete.id);
        Swal.fire('Eliminado', 'El registro ha sido eliminado', 'success');
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire('Cancelado', 'La acción ha sido cancelada', 'error');
      }
    });
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
