import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { User } from './User.model';
import { environment } from '../../environments/environment';


@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private backendUrlString = environment.backendUrl;
  public user = new BehaviorSubject<User | null>(null);
  public currentUser = this.user.asObservable();

  constructor(private http: HttpClient) {}

  signup(email: string, password: string): Observable<any> {
    return this.http.post(
      `${this.backendUrlString}/api/v1/auth/register`,
      { email, password },
      { withCredentials: true }
    );
  }
}
