import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { User } from './User.model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private backendUrlString = 'http://localhost:3000/api/v1/auth/login';
  public user = new BehaviorSubject<User | null>(null);
  public currentUser = this.user.asObservable();

  constructor(private http: HttpClient) {}

  signup(email: string, password: string): Observable<any> {
    return this.http.post(
      this.backendUrlString,
      { email, password },
      { withCredentials: true }
    );
  }
}
