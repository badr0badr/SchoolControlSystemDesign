import { Injectable } from '@angular/core';
import { HallSammryData, ResponseDataView, SendData, StudentsAppliedExam } from '../Interface/data';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class SubControlService {
  private BaseUrl = environment.API_BASE_URL;
  private header = new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': `Bearer ${localStorage.getItem('token')}` });
  constructor(private _HttpClient: HttpClient) { }
  GetStudentsForAppliedExam(data: SendData): Observable<StudentsAppliedExam[]> {
    return this._HttpClient.post<StudentsAppliedExam[]>(`${this.BaseUrl}/api/SubControl/GetStudentsForAppliedExam`, data, { headers: this.header });
  }
  SaveStudentsForAppliedExam(data: SendData): Observable<ResponseDataView> {
    return this._HttpClient.post<ResponseDataView>(`${this.BaseUrl}/api/SubControl/SaveStudentsForAppliedExam`, data, { headers: this.header });
  }
  GetAllFileNamesInFolder(data: SendData): Observable<string[]> {
    return this._HttpClient.post<string[]>(`${this.BaseUrl}/api/SubControl/GetAllFileNamesInFolder`, data, { headers: this.header });
  }
 HallSummryDatas(data: SendData): Observable<HallSammryData[]> {
    return this._HttpClient.post<HallSammryData[]>(`${this.BaseUrl}/api/SubControl/HallSummryDatas`, data, { headers: this.header });
  }




    DownloadFile(fileName: string): Observable<Blob> {
    const Url = `${this.BaseUrl}/api/SubControl/Download/${fileName}`;
    return this._HttpClient.get(Url, { responseType: 'blob' });
  }
}
