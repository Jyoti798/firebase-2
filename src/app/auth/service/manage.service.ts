import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { User } from 'src/app/models/user/user';

@Injectable({
  providedIn: 'root'
})
export class ManageService {
  private USER_DATA_TOKEN = 'USER_DATA';
  private userSubject = new BehaviorSubject<User | undefined>(this.getUserFromLocal());

  user$ = this.userSubject.asObservable();

  getUser(): User | undefined {
    return this.userSubject.value;
  }

  getUserId(): string | undefined {
    return this.userSubject.value?.id;
  }

  getUserFromLocal(): User | undefined {
    const data = localStorage.getItem(this.USER_DATA_TOKEN);
    return data ? JSON.parse(data) : undefined;
  }

  setUserInLocal(user: User): void {
    this.userSubject.next(user);
    localStorage.setItem(this.USER_DATA_TOKEN, JSON.stringify(user));
  }

  logout() {
    this.userSubject.next(undefined);
    localStorage.removeItem(this.USER_DATA_TOKEN);
  }
}
