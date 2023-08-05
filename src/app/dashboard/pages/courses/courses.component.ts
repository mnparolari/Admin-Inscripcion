import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { Courses } from './models/courses';
import { CoursesService } from './services/courses.service';
import { MatDialog } from '@angular/material/dialog';
import { CoursesDialogComponent } from './components/courses-dialog/courses-dialog.component';
import { NotifierService } from 'src/app/core/services/notifier.service';
import { DatePipe } from '@angular/common';
import Swal from 'sweetalert2';
import { SpinnerService } from 'src/app/core/services/spinner.service';


@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.scss']
})
export class CoursesComponent implements OnInit, OnDestroy {

  public courses$: Observable<Courses[]>;
  showSpinner = true;
  private subscription!: Subscription;

  constructor(public dialog: MatDialog, private coursesService: CoursesService, private notifier: NotifierService, private datePipe: DatePipe, private spinner: SpinnerService) {
    this.courses$ = this.coursesService.getCourses();
  }

  ngOnInit(): void {
    this.subscription = this.spinner.getSpinner().subscribe((show: boolean) => {
      this.showSpinner = show;
    });
    this.coursesService.loadCourses();
    this.spinner.hide();
  };

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  onCreateCourse(): void {
    this.dialog
      .open(CoursesDialogComponent)
      .afterClosed()
      .subscribe({
        next: (c) => {
          if (c) {
            const formattedCourseFrom = this.formatDate(c.courseFrom);
            const formattedCourseTo = this.formatDate(c.courseTo);
            this.coursesService.createCourses({
              id: c.id,
              icon: c.icon,
              name: c.name,
              category: c.category,
              teacher: c.teacher,
              courseFrom: formattedCourseFrom,
              courseTo: formattedCourseTo
            });
            this.notifier.showSucces('Curso creado', 'El curso se creó correctamente')
          }
        }
      });
  }

  formatDate(dateStr: string | null | undefined): string {
    if (!dateStr) {
      return '';
    }

    const dateObj = new Date(dateStr);
    const formattedDate = this.datePipe.transform(dateObj, 'dd/MM/yyyy');
    return formattedDate || '';
  }

  onDeleteCourse(courseToDelete: Courses): void {
    Swal.fire({
      title: `¿Estás seguro que queres eliminar el curso de <span style = "color: #F44336">${courseToDelete.name}</span>?`,
      text: 'Esta acción no se puede deshacer',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, eliminarlo',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.coursesService.deleteCourses(courseToDelete.id)
        this.notifier.showSucces('Eliminado', 'El registro ha sido eliminado correctamente');
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        this.notifier.showError('Cancelado', 'La acción ha sido cancelada');
      }
    });
  }

  onEditCourse(courseToEdit: Courses): void {
    this.dialog
      .open(CoursesDialogComponent, {
        data: courseToEdit
      })
      .afterClosed()
      .subscribe({
        next: (courseUpdated) => {
          if (courseUpdated) {
            const formattedCourseFrom = courseUpdated.courseFrom.toLocaleDateString('es-AR');
            const formattedCourseTo = courseUpdated.courseTo.toLocaleDateString('es-AR');
            const updatedCourseData: Courses = {
              ...courseUpdated,
              courseFrom: formattedCourseFrom,
              courseTo: formattedCourseTo
            };
            this.coursesService.updatedCourses(courseToEdit.id, updatedCourseData);
            this.notifier.showSucces('Curso modificado', 'El curso se modificó correctamente')
          }
        }
      });
  };
}
