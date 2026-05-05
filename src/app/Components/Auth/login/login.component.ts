import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { LogIn, Users } from 'src/app/Interface/auth';
import { SendData } from 'src/app/Interface/data';
import { AuthService } from 'src/app/Services/auth.service';
import { HelperService } from 'src/app/Services/helper.service';
import { ShareService } from 'src/app/Services/share.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
apierror: string = '';
  SchoolId: number = 0;
  isloading: boolean = false;
  users: Users[] = []
  Schools: { id: number, name: string, teachers: Users[] }[] = [];
  loginform: FormGroup = new FormGroup({
    School: new FormControl(null),
    userName: new FormControl(null),
    password: new FormControl(null),
  });
  loginformdata: LogIn = undefined!;
  constructor(private _AuthService: AuthService, private _Router: Router,
    private _Share: ShareService, private _HelperService: HelperService) { }

  ngOnInit(): void {
    if (localStorage.getItem('token') != null) {
      this.GetTeacherData();
    }
    this.GetSchools();
  }
  ChangeTeachers() {
    this.users = [];
    this.SchoolId = this.loginform.value.School;
    for (let i = 0; i < this.Schools.length; i++) {
      if (this.Schools[i].id == this.SchoolId) {
        this.users = this.Schools[i].teachers;
      }
    }
  }
  GetSchools() {
    this.isloading = true;
    this._HelperService.GetSchools().subscribe({
      next: (response) => {
        if (response) {
          this.Schools = response;
          this.isloading = false;
        }
      },
      error: (err: any) => {
        this.apierror = err?.error?.message;
        this.isloading = false;
      }
    })
  }
  GetTeacherData() {
    this.isloading = true;
    this.apierror = '';
    let SendData = { request: localStorage.getItem('token')!, token: localStorage.getItem('token')! } as SendData;
    this._AuthService.TeacherDataByToken(SendData).subscribe({
      next: (response) => {
        if (response) {
          localStorage.setItem('token', response.token);
          this._Share.changeUserData(response);
          this._Router.navigate(['/thome']);
          this.isloading = false;
        }
      }
    });
  }
  submitlogin(dataform: FormGroup) {
    this.loginformdata = {
      id: dataform.value.userName,
      password: dataform.value.password
    };
    this.isloading = true;
    let senddata: SendData = { request: this.loginformdata, token: "" };
    this._AuthService.loginUser(senddata).subscribe({
      next: (response) => {
        if (response) {
          this._Share.changeUserData(response);
            localStorage.setItem('token', response.token);
            this.isloading = false;
            this._Router.navigate(['/thome']);
        }
      },
      error: (err: any) => {
        this.apierror = err.error.message;
        this.isloading = false;
      }
    })
  }
}
