import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { User } from '../Interface/auth';
import { Observable } from 'rxjs';
import { SendData } from '../Interface/data';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private BaseUrl = environment.API_BASE_URL;
    private header = new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': `Bearer ${localStorage.getItem('token')}` });
    constructor(private _HttpClient: HttpClient, private router: Router) {
    }
    logout() {
      localStorage.removeItem('token');
      this.router.navigateByUrl('/login');
    }
    loginUser(data: SendData): Observable<User> {
      return this._HttpClient.post<User>(`${this.BaseUrl}/api/Auth/ControlTeacherLogin`, data, { headers: this.header });
    }
    TeacherDataByToken(data: SendData): Observable<User> {
      return this._HttpClient.post<User>(`${this.BaseUrl}/api/Auth/ControlTeacherDataByToken`, data, { headers: this.header });
    }
}
