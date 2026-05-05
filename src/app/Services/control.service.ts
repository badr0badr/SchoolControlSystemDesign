import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { GetControlTeachers, ResponseDataView, SendData } from '../Interface/data';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ControlService {
  private BaseUrl = environment.API_BASE_URL;
  private header = new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': `Bearer ${localStorage.getItem('token')}` });
  constructor(private _HttpClient: HttpClient, private router: Router) { }

  AddToControl(data: SendData): Observable<ResponseDataView> {
    return this._HttpClient.post<ResponseDataView>(`${this.BaseUrl}/api/Control/AddToControl`, data, { headers: this.header });
  }
  GetCM(data: SendData): Observable<GetControlTeachers[]> {
    return this._HttpClient.post<GetControlTeachers[]>(`${this.BaseUrl}/api/Control/GetControlTeachers`, data, { headers: this.header });
  }
  DeleteCM(data: SendData): Observable<ResponseDataView> {
    return this._HttpClient.post<ResponseDataView>(`${this.BaseUrl}/api/Control/DeleteFromControl`, data, { headers: this.header });
  }







//   MerrorData(data: SendData): Observable<StudentMirror[]> {
//     return this._HttpClient.post<StudentMirror[]>(`${this.BaseUrl}/api/Control/MerrorData`, data, { headers: this.header });
//   }

//   AddDirectorateUser(data: SendData): Observable<ResponseDataView> {
//     return this._HttpClient.post<ResponseDataView>(`${this.BaseUrl}/api/Directorate/AddDirectorateUser`, data, { headers: this.header });
//   }


//   AddPlaceNumbers(data: SendData): Observable<ResponseDataView> {
//     return this._HttpClient.post<ResponseDataView>(`${this.BaseUrl}/api/Control/AddPlaceNumbers`, data, { headers: this.header });
//   }
//     GetStudentCountInExamHall(data: SendData): Observable<ResponseDataView> {
//     return this._HttpClient.post<ResponseDataView>(`${this.BaseUrl}/api/Control/GetStudentCountInExamHall`, data, { headers: this.header });
//   }
//   AddStudentInExamHall(data: SendData): Observable<ResponseDataView> {
//     return this._HttpClient.post<ResponseDataView>(`${this.BaseUrl}/api/Control/AddStudentInExamHall`, data, { headers: this.header });
//   }
//     GetPlaceNumbers(data: SendData): Observable<GetPlaceNumbersView> {
//     return this._HttpClient.post<GetPlaceNumbersView>(`${this.BaseUrl}/api/Control/GetPlaceNumbers`, data, { headers: this.header });
//   }
//     AddSecriteCodes(data: SendData): Observable<ResponseDataView> {
//     return this._HttpClient.post<ResponseDataView>(`${this.BaseUrl}/api/Control/AddSecriteCodes`, data, { headers: this.header });
//   }

// GetExamTempltesModel(data: SendData): Observable<ExamTempleteModelData[]> {
//     return this._HttpClient.post<ExamTempleteModelData[]>(`${this.BaseUrl}/api/Control/GetExamTempltesModel`, data, { headers: this.header });
//   }





}
