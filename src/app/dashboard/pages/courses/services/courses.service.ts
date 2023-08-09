import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, take, map, mergeMap } from 'rxjs';
import { Courses } from '../models/courses';
import { HttpClient } from '@angular/common/http';
import { NotifierService } from 'src/app/core/services/notifier.service';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CoursesService {

  private _courses$ = new BehaviorSubject<Courses[]>([]);
  private courses$ = this._courses$.asObservable();

  constructor(private httpClient: HttpClient, private notifier: NotifierService) { }


  loadCourses(): void {
    this.httpClient.get<Courses[]>(environment.baseApiUrl + '/courses').subscribe({
      next: (courses) => {
        this._courses$.next(courses);
      },
      error: () => {
        this.notifier.showError('Error', 'No se pueden recuperar los cursos')
      }
    })
  };

  getCourses(): Observable<Courses[]> {
    return this._courses$.asObservable();
  }

  createCourses(course: Courses): void {
    this.httpClient.post<Courses>(environment.baseApiUrl + '/courses', course)
      .pipe(
        mergeMap((courseCreated) => this.courses$.pipe(
          take(1),
          map((data) => [...data, courseCreated])
        ))
      )
      .subscribe({
        next: (courseData) => {
          this._courses$.next(courseData);
        }
      })
  };

  updatedCourses(id: number, dataUpdated: Courses): void {
    this.httpClient.put(environment.baseApiUrl + '/courses/' + id, dataUpdated).subscribe({
      next: () => this.loadCourses()
    })
  };

  deleteCourses(id: number): void {
    this.httpClient.delete(environment.baseApiUrl + '/courses/' + id)
      .pipe(
        mergeMap(
          () => this.courses$.pipe(
            take(1), map((data) => data.filter((c) => c.id !== id))
          ))
      ).subscribe({
        next: (dataCourse) => this._courses$.next(dataCourse)
      })
  };

  getCourseById(id: number): Observable<Courses | undefined> {
    return this.courses$.pipe(take(1), map((course) => course.find((c) => c.id === id)),)
  }
}
