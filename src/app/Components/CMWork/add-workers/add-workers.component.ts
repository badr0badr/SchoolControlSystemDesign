import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Subscription } from 'rxjs';
import { User } from 'src/app/Interface/auth';
import { GetControlTeachers, IdNumberNameView, IdStringNameView, SendData } from 'src/app/Interface/data';
import { ControlService } from 'src/app/Services/control.service';
import { HelperService } from 'src/app/Services/helper.service';
import { ShareService } from 'src/app/Services/share.service';

@Component({
  selector: 'app-add-workers',
  imports: [CommonModule,FormsModule],
  templateUrl: './add-workers.component.html',
  styleUrl: './add-workers.component.css',
})
export class AddWorkersComponent {
  IsActive: boolean = false;
  TeacherIds: IdNumberNameView[] = [];
  TeacherId: number = 0;
  controlType: string = '';
  apierror: string = '';
  ControlTypes: IdStringNameView[] = [
    { id: 'Viewer', name: 'مراقب' },
    { id: 'Adder', name: 'مضيف' },
  ];


  constructor(private _Share: ShareService, private _ControlService: ControlService, private _HelperService: HelperService) { }
  TeachersControl: GetControlTeachers[] = [];
  Userdata: User = {} as User;
  private subscription1: Subscription = new Subscription();
  ngOnInit(): void {
    this.subscription1 = this._Share.UserData.subscribe((section) => {
      this.Userdata = section;
    });
    this.GetTeacher();
    this.GetCM();
  }


  GetTeacher() {
    this._Share.changeisloading(true);
    let SendData = { request: this.Userdata.schoolId, token: this.Userdata.token } as SendData;
    this._HelperService.GetAllTeachers(SendData).subscribe({
      next: (response) => {
        if (response) {
          this.TeacherIds = response;
          this._Share.changeisloading(false);
        }
      },
      error: (err: any) => {
        this.apierror = err.error.message;
        this._Share.changeisloading(false);
      }
    })
  }


  AddControlTeacher() {
    this._Share.changeisloading(true);
    let senddata = {
      request: {
        teacherId: this.TeacherId,
        controlType: this.controlType,
      }
      , token: this.Userdata.token
    } as SendData;
    this._ControlService.AddToControl(senddata).subscribe({
      next: (response) => {
        if (response.status === 200) {
          alert(response.message);
          this.GetCM();
          this._Share.changeisloading(false);
        } else {
          this.apierror = response.message;
          this._Share.changeisloading(false);
        }
      },
      error: (err: any) => {
        this._Share.changeisloading(false);
        this.apierror = err.error.message;
        if (err.error.errors) {
          this.apierror += '\n' + Object.values(err.error.errors).flat().join(', ');
        }
      }
    })
  }

  GetCM() {
    this._Share.changeisloading(true);
    let senddata: SendData = { request: this.Userdata.schoolId, token: this.Userdata.token };
    this._ControlService.GetCM(senddata).subscribe({
      next: (response) => {
        this.TeachersControl = response;
        this._Share.changeisloading(false);
      },
      error: (err) => {
        this.apierror = err.error.message;
        this._Share.changeisloading(false);
      }
    });
  }


  VAlert: boolean = false;
  DeleteTeacherId: number = 0;
  DeleteTeacherName: string = '';
  ViewAlert(Teacher: number, tname: string) {
    this.DeleteTeacherId = Teacher;
    this.DeleteTeacherName = tname;
    if (this.VAlert === true)
      this.VAlert = false
    else
      this.VAlert = true
  }


  ConfirmDelete() {
    this._Share.changeisloading(true);
    let senddata: SendData = { request: this.DeleteTeacherId, token: this.Userdata.token };
    this._ControlService.DeleteCM(senddata).subscribe({
      next: (response) => {
        if (response.status === 200) {
          alert(response.message);
          this.GetCM();
          this._Share.changeisloading(false);
        } else {
          this.apierror = response.message;
          this._Share.changeisloading(false);
        }
      },
      error: (err) => {
        this.apierror = err.error.message;
        this._Share.changeisloading(false);
      }
    });
    this.VAlert = false;
  }
}
