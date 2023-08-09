import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { FormDialogComponent } from './components/user-form-dialog/form-dialog.component';
import { Users } from './models/user';
import { Observable, Subscription } from 'rxjs';
import Swal from 'sweetalert2';
import { UserServiceService } from './services/users.service';
import { NotifierService } from 'src/app/core/services/notifier.service';
import { SpinnerService } from 'src/app/core/services/spinner.service';


@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit, OnDestroy {

  public users$: Observable<Users[]>;
  showSpinner = true;
  private subscription!: Subscription;


  constructor(public dialog: MatDialog, private userService: UserServiceService, private notifier: NotifierService, private spinner: SpinnerService) {
    this.users$ = this.userService.getUsers();
  };

  ngOnInit(): void {
    this.subscription = this.spinner.getSpinner().subscribe((show: boolean) => {
      this.showSpinner = show;
    });
    this.userService.loadUsers();
    this.spinner.hide();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  onCreateUser(): void {
    this.dialog
      .open(FormDialogComponent)
      .afterClosed()
      .subscribe({
        next: (u) => {
          if (u) {
            this.userService.createdUser({
              id: u.id,
              name: u.name,
              surname: u.surname,
              phone: u.phone,
              email: u.email,
              password: u.password,
              userType: u.userType,
              token: u.token
            });
            this.notifier.showSucces('Usuario creado', 'El usuario se creó correctamente')
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
        this.userService.deleteUser(userToDelete.id)
        this.notifier.showSucces('Eliminado', 'El registro ha sido eliminado correctamente');
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        this.notifier.showError('Cancelado', 'La acción ha sido cancelada');
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
          if (userUpdated) {
            this.userService.updatedUser(userToEdit.id, userUpdated)
            this.notifier.showSucces('Usuario modificado', 'El usuario se modificó correctamente')
          }
        }
      })
  }
}
