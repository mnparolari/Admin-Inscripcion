import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, take, map } from 'rxjs';
import { Courses } from '../models/courses';

@Injectable({
  providedIn: 'root'
})
export class CoursesService {

  private _courses$ = new BehaviorSubject<Courses[]>([]);
  private courses$ = this._courses$.asObservable();

  constructor() { }

  getCourses(): Observable<Courses[]> {
    return this._courses$.asObservable();
  }

  loadCourses(): void {
    this._courses$.next([
      {
        icon: './assets/angular.png',
        name: 'Angular',
        category: 'Programación y Desarrollo',
        commission: 1000,
        teacher: 'Martín Parolari',
        courseFrom: '12/11/2023',
        courseTo: '22/03/2024'
      },
      {
        icon: './assets/photoshop.png',
        name: 'Photoshop',
        category: 'Diseño UX/UI',
        commission: 1002,
        teacher: 'Xoana Casanova',
        courseFrom: '10/01/2023',
        courseTo: '12/02/2023'
      },
      {
        icon: './assets/rstudio.png',
        name: 'Rstudio',
        category: 'Data',
        commission: 1005,
        teacher: 'Nicolás Scarinci',
        courseFrom: '22/05/2024',
        courseTo: '2/10/2024'
      }
    ]);
  };

  createCourses(course: Courses): void {
    this._courses$.pipe(take(1)).subscribe({
      next: (coursesCurrent) => {
        this._courses$.next([...coursesCurrent, course])
      }
    });
  };

  updatedCourses(commission: number, dataUpdated: Courses): void {
    this.courses$.pipe(take(1)).subscribe({
      next: (data) => {
        this._courses$.next(
          data.map((course) => course.commission === commission ? { ...course, ...dataUpdated } : course)
        )
      }
    })
  };

  deleteCourses(commission: number): void {
    this._courses$.pipe(take(1)).subscribe({
      next: (coursesCurrent) => {
        this._courses$.next(coursesCurrent.filter((course) => course.commission !== commission))
      }
    });
  };

  getCourseByCommission(commission: number): Observable<Courses | undefined> {
    return this.courses$.pipe(take(1), map((course) => course.find((c) => c.commission === commission)),)
  }

}
