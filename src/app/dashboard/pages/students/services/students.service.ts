import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, take, map } from 'rxjs';
import { Students } from '../models/students';


@Injectable({
  providedIn: 'root'
})
export class StudentsService {

private _students$ = new BehaviorSubject<Students[]>([]);
private students$ = this._students$.asObservable();

  constructor() { }

  getStudents(): Observable<Students[]> {
    return this._students$.asObservable();
  };

  loadStudents(): void {
    this._students$.next([
      {
        id: 1,
        name: 'Emilia',
        surname: 'López',
        phone: '1155223366',
        email: 'emilia@gmail.com',
        password: 'EmiliaEmilia123'
      }
    ])
  };

  createStudents(students: Students): void {
    this._students$.pipe(take(1)).subscribe({
      next: (studentsCurrent) => {
        this._students$.next([...studentsCurrent, students])
      }
    })
  };

  updatedStudents(id: number, dataUpdated: Students): void {
    this.students$.pipe(take(1)).subscribe({
      next: (data) => {
        this._students$.next(
          data.map((student) => student.id === id ? {...student, ...dataUpdated} : student)
        )
      }
    })
  };

  deleteStudents(id:number): void {
    this._students$.pipe(take(1)).subscribe({
      next: (studentCurrent) => {
        this._students$.next(studentCurrent.filter((student) => student.id !== id))
      }
    })
  };

  getStudentById(id: number): Observable<Students | undefined> {
    return this.students$.pipe(take(1), map((student) => student.find((s) => s.id === id)),)
  }
}


