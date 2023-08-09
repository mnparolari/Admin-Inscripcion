import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, take, map, mergeMap } from 'rxjs';
import { Students } from '../models/students';
import { HttpClient } from '@angular/common/http';
import { NotifierService } from 'src/app/core/services/notifier.service';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class StudentsService {

  private _students$ = new BehaviorSubject<Students[]>([]);
  private students$ = this._students$.asObservable();

  constructor(private httpClient: HttpClient, private notifier: NotifierService) { }

  loadStudents(): void {
    this.httpClient.get<Students[]>(environment.baseApiUrl + '/students').subscribe({
      next: (students) => {
        this._students$.next(students);
      },
      error: () => {
        this.notifier.showError('Error', 'No se pueden recuperar los usuarios')
      }
    })
  };

  getStudents(): Observable<Students[]> {
    return this._students$.asObservable();
  };

  createStudents(students: Students): void {
    this.httpClient.post<Students>(environment.baseApiUrl + '/students', students)
    .pipe(
      mergeMap((studentCreated) => this.students$.pipe(
        take(1),
        map((data) => [...data, studentCreated])
      ))
    )
    .subscribe({
      next: (studentData) => {
        this._students$.next(studentData)
      }
    });
  };

  updatedStudents(id: number, dataUpdated: Students): void {
    this.httpClient.put(environment.baseApiUrl + '/students/' + id, dataUpdated).subscribe({
      next: () => this.loadStudents()
    })
  };

  deleteStudents(id: number): void {
    this.httpClient.delete(environment.baseApiUrl + '/students/' + id)
      .pipe(
        mergeMap(
          (studentDelete) => this.students$.pipe(
            take(1), map((data) => data.filter((student) => student.id !== id))
          ))
      ).subscribe({
        next: (dataStudent) => this._students$.next(dataStudent)
      })
  };

  getStudentById(id: number): Observable<Students | undefined> {
    return this.students$.pipe(take(1), map((student) => student.find((s) => s.id === id)),)
  }
}


