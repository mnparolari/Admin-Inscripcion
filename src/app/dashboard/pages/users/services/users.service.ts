import { Injectable } from '@angular/core';
import { Users } from '../models/user';
import { BehaviorSubject, Observable, of, take } from 'rxjs';

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

  private users$ = new BehaviorSubject<Users[]>([]);

  constructor() { }

  loadUsers(): void {
    DATA_USERS.subscribe({
      next: (usersDB) => this.users$.next(usersDB)
    })
  }

  getUsers(): Observable<Users[]> {
    return this.users$;
  }

  createdUser(user:Users): void {
    this.users$.pipe(take(1)).subscribe({
      next: (data) => {
        this.users$.next([...data, user])
      }
    })
  };

  updatedUser(id: number, dataUpdated: Users): void {
    this.users$.pipe(take(1)).subscribe({
      next: (data) => {
        this.users$.next(
          data.map((user) => user.id === id ? {...user, ...dataUpdated} : user) 
        )
      }
    })
  };

  deleteUser(id: number): void {
    this.users$.pipe(take(1)).subscribe({
      next: (data) => {
        this.users$.next(
          data.filter((user) => user.id !== id ) 
        )
      }
    })
  };
}