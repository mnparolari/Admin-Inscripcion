import { Injectable } from '@angular/core';
import { Users } from '../models/user';
import { BehaviorSubject, Observable, of, take, map } from 'rxjs';

const DATA_USERS: Observable<Users[]> = of([
  {
    id: 1,
    name: 'Martin',
    surname: 'Parolari',
    phone: '1134629639',
    email: 'mnparolari@gmail.com',
    password: '123456',
    userType: 'Profesor'
  }
]);

@Injectable({
  providedIn: 'root'
})
export class UserServiceService {

  private _users$ = new BehaviorSubject<Users[]>([]);
  private users$ = this._users$.asObservable();

  constructor() { }

  loadUsers(): void {
    DATA_USERS.subscribe({
      next: (usersDB) => this._users$.next(usersDB)
    })
  }

  getUsers(): Observable<Users[]> {
    return this.users$;
  }

  createdUser(user:Users): void {
    this.users$.pipe(take(1)).subscribe({
      next: (data) => {
        this._users$.next([...data, user])
      }
    })
  };

  updatedUser(id: number, dataUpdated: Users): void {
    this.users$.pipe(take(1)).subscribe({
      next: (data) => {
        this._users$.next(
          data.map((user) => user.id === id ? {...user, ...dataUpdated} : user) 
        )
      }
    })
  };

  deleteUser(id: number): void {
    this._users$.pipe(take(1)).subscribe({
      next: (data) => {
        this._users$.next(
          data.filter((user) => user.id !== id ) 
        )
      }
    })
  };

  getUserById(id: number): Observable<Users | undefined>{
    return this.users$.pipe(
      take(1),
        map((users) => users.find((user) => user.id === id)),)
  }
}