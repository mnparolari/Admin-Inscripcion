import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable } from 'rxjs';
import { Courses } from './models/courses';
import { CoursesService } from './services/courses.service';
import { MatDialog } from '@angular/material/dialog';
import { CoursesDialogComponent } from './components/courses-dialog/courses-dialog.component';
import { NotifierService } from 'src/app/core/services/notifier.service';
import { DatePipe } from '@angular/common';
import Swal from 'sweetalert2';

let currentId = 1006;

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.scss']
})
export class CoursesComponent implements OnInit  {
  

  public courses$: Observable<Courses[]>;

  constructor(public dialog: MatDialog, private coursesService: CoursesService, private notifier: NotifierService, private datePipe: DatePipe) {
    this.courses$ = this.coursesService.getCourses();
  }
  
  ngOnInit(): void {
    this.coursesService.loadCourses();
  };

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
              icon: c.icon,
              name: c.name,
              category: c.category,
              commission: currentId++,
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
        this.coursesService.deleteCourses(courseToDelete.commission)
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
            this.coursesService.updatedCourses(courseToEdit.commission, courseUpdated)
            this.notifier.showSucces('Curso modificado', 'El curso se modificó correctamente')
          }
        }
      })
  }
}
