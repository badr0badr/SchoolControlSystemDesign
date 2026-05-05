import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { User } from 'src/app/Interface/auth';
import { SendData } from 'src/app/Interface/data';
import { AuthService } from 'src/app/Services/auth.service';
import { ShareService } from 'src/app/Services/share.service';


@Component({
    selector: 'app-teacher-home',
    templateUrl: './teacher-home.component.html',
    styleUrls: ['./teacher-home.component.css'],
    standalone: false
})
export class TeacherHomeComponent implements OnInit {
  constructor(private _Share: ShareService, private _Router: Router, private _AuthService: AuthService,
  private cd:ChangeDetectorRef) { }
  private subscription1: Subscription = new Subscription();   //home section
  private subscription2: Subscription = new Subscription();   //user
  private subscription3: Subscription = new Subscription();   //isloading
  SectionName: string = '';
  isloading: boolean = false;
  apierror: string = '';
  SchoolUrl: string = 'assets/school_logo.png';
  Userdata: User = {} as User;


  ngOnInit(): void {
    if (!localStorage.getItem('token')!) {
      this._Router.navigate(['/login']);
    }
    this.subscription2 = this._Share.UserData.subscribe((section) => {
      this.Userdata = section;
    });
    if (this.Userdata.id === null || this.Userdata.id === undefined){
      this.GetTeacherData();
    }
    this.subscription1 = this._Share.HomeSectionName.subscribe((section) => {
      this.SectionName = section;
    });
    this.subscription3 = this._Share.isloading.subscribe((section) => {
      this.isloading = section;
      this.cd.markForCheck();
    });
  }
  Logout() {
    this._AuthService.logout();
  }
  ChangSection(section: string) {
    this._Share.changeUserData(this.Userdata);
    this._Share.changeHomeSectionName(section);
  }
  GetTeacherData() {
    this.isloading = true;
    let SendData = { request: localStorage.getItem('token')!, token: localStorage.getItem('token')! } as SendData;
    this._AuthService.TeacherDataByToken(SendData).subscribe({
      next: (response) => {
        if (response) {
          localStorage.setItem('token', response.token);
          this._Share.changeUserData(response);
          this.isloading = false;
        }
      },
      error: (err) => {
        this.apierror = err.error.message;
        this._Router.navigate(['/login']);
        this.isloading = false;
      }
    });
  }
}