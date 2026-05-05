import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { IdNumberNameView, SendData } from '../Interface/data';
import { Observable } from 'rxjs';
import { Users } from '../Interface/auth';

@Injectable({
  providedIn: 'root'
})
export class HelperService {

  private BaseUrl = environment.API_BASE_URL;
  private header = new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': `Bearer ${localStorage.getItem('token')}` });
  constructor(private _HttpClient: HttpClient) { }



  GetStudent(data: SendData): Observable<IdNumberNameView[]> {
    return this._HttpClient.post<IdNumberNameView[]>(`${this.BaseUrl}/api/Helper/GetStudent`, data, { headers: this.header });
  }
  GetSubjects(data: SendData): Observable<IdNumberNameView[]> {
    return this._HttpClient.post<IdNumberNameView[]>(`${this.BaseUrl}/api/Helper/GetSubjects`, data, { headers: this.header });
  }
  GetSubjectsInSchoolHasApplied(data: SendData): Observable<IdNumberNameView[]> {
    return this._HttpClient.post<IdNumberNameView[]>(`${this.BaseUrl}/api/Helper/GetSubjectsInSchoolHasApplied`, data, { headers: this.header });
  }
  GetSubjectsInSchoolWithType(data: SendData): Observable<IdNumberNameView[]> {
    return this._HttpClient.post<IdNumberNameView[]>(`${this.BaseUrl}/api/Helper/GetSubjectsInSchoolWithType`, data, { headers: this.header });
  }
  GetSubjectsInSchool(data: SendData): Observable<IdNumberNameView[]> {
    return this._HttpClient.post<IdNumberNameView[]>(`${this.BaseUrl}/api/Helper/GetSubjectsInSchool`, data, { headers: this.header });
  }
  GetClasses(data: SendData): Observable<IdNumberNameView[]> {
    return this._HttpClient.post<IdNumberNameView[]>(`${this.BaseUrl}/api/Helper/GetClasses`, data, { headers: this.header });
  }
  GetWeeks(data: SendData): Observable<IdNumberNameView[]> {
    return this._HttpClient.post<IdNumberNameView[]>(`${this.BaseUrl}/api/Helper/GetWeeks`, data, { headers: this.header });
  }
  GetRoles(): Observable<IdNumberNameView[]> {
    return this._HttpClient.post<IdNumberNameView[]>(`${this.BaseUrl}/api/Helper/GetRolesForSchool`, {}, { headers: this.header });
  }
  GetSchools(): Observable<{ id: number, name: string, teachers: Users[] }[]> {
    return this._HttpClient.post<{ id: number, name: string, teachers: Users[] }[]>(`${this.BaseUrl}/api/Helper/GetSchools`, {}, { headers: this.header });
  }
  GetSubjectsSupervisior(data: SendData): Observable<IdNumberNameView[]> {
    return this._HttpClient.post<IdNumberNameView[]>(`${this.BaseUrl}/api/Helper/GetSubjectsSupervisior`, data, { headers: this.header });
  }
  GetTeacher(data: SendData): Observable<IdNumberNameView[]> {
    return this._HttpClient.post<IdNumberNameView[]>(`${this.BaseUrl}/api/Helper/GetTeachers`, data, { headers: this.header });
  }
  GetTitle(): Observable<IdNumberNameView[]> {
    return this._HttpClient.post<IdNumberNameView[]>(`${this.BaseUrl}/api/Helper/GetAllTeacherTitles`, {}, { headers: this.header });
  }
  GetClassesNames(data: SendData): Observable<string[]> {
    return this._HttpClient.post<string[]>(`${this.BaseUrl}/api/Helper/GetClassesNames`, data, { headers: this.header });
  }



  DownloadFile(fileName: string): Observable<Blob> {
    const Url = `${this.BaseUrl}/api/Dashboard/Download/${fileName}`;
    return this._HttpClient.get(Url, { responseType: 'blob' });
  }
}


