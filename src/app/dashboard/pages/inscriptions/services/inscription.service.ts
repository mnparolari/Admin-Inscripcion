import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { DataInscription, Inscription, InscriptionPayload } from '../models/inscription';
import { environment } from 'src/environments/environment';
import { Course } from '../../courses/models/course';
import { Student } from '../../students/models/student';
import { Store } from '@ngrx/store';

@Injectable({
  providedIn: 'root'
})
export class InscriptionService {

  constructor(private httpClient: HttpClient, private store: Store) { }

  getInscriptionsFromDB(): Observable<DataInscription[]> {
    return this.httpClient.get<DataInscription[]>(environment.baseApiUrl + '/inscriptions?_expand=student&_expand=course')
  }

  getCoursesOptions(): Observable<Course[]> {
    return this.httpClient.get<Course[]>(environment.baseApiUrl + '/courses')
  }

  getStudentsOptions(): Observable<Student[]> {
    return this.httpClient.get<Student[]>(environment.baseApiUrl + '/students')
  }

  getCreateInscription(payload: InscriptionPayload): Observable<Inscription> {
    return this.httpClient.post<Inscription>(environment.baseApiUrl + '/inscriptions', payload)
  }

  getDeleteInscription(data: number): Observable<void> {
    return this.httpClient.delete<void>(environment.baseApiUrl + '/inscriptions/' + data)
  }

  updateInscription(updatedInscription: Inscription): Observable<void> {
    const { id, courseId, studentId } = updatedInscription;
    const updateData = { id, courseId, studentId };
    
    return this.httpClient.put<void>(`${environment.baseApiUrl}/inscriptions/${id}`, updateData);
  }
}
