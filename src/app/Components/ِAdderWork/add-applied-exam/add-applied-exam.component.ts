import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Subscription } from 'rxjs';
import { User } from 'src/app/Interface/auth';
import { IdNumberNameView, SendData, StudentsAppliedExam } from 'src/app/Interface/data';
import { HelperService } from 'src/app/Services/helper.service';
import { ShareService } from 'src/app/Services/share.service';
import { SubControlService } from 'src/app/Services/sub-control.service';

@Component({
  selector: 'app-add-applied-exam',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './add-applied-exam.component.html',
  styleUrls: ['./add-applied-exam.component.css'],
})
export class AddAppliedExamComponent {
  ClassIds:IdNumberNameView[]=[];
  ClassId:number=0;
  SubjectIds:IdNumberNameView[]=[];
  SubjectId:number=0;
  Month: number = 0;
  VAlert: boolean = false;
  IsForAll: boolean = false;
  StudentIndex: number = 0;
  apierror: string = '';
  Review: number = undefined!;
  IsValid: boolean = false;
  IsValidR: boolean = false;
  studentId: number = 0;
  Students: StudentsAppliedExam[] = [];
  constructor(private _Share: ShareService, private _HelperService: HelperService, private _SubControlService: SubControlService) { }
  private subscription1: Subscription = new Subscription();
  Userdata: User = {} as User;
  ngOnInit(): void {
    this.subscription1 = this._Share.UserData.subscribe((section) => {
      this.Userdata = section;
    });
    this.GetClasses();
    this.GetSubjects();
  }
  IsAll() {
    this.Review = 0;
    this.ChangeIsValid();
  }
  changestudentIndex() {
    this.StudentIndex = this.Students.findIndex(p => p.studentId == this.studentId);
  }
  ChangeIsValid() {
    if (this.IsValidR)
      this.IsValid = true;
    else
      this.IsValid = false;
  }
  ValidateReview() {
    if (this.Review >= 0 && this.Review <= 15)
      this.IsValidR = true;
    else
      this.IsValidR = false;
    this.ChangeIsValid();
  }
  GetClasses() {
    this._Share.changeisloading(true);
    let SendData = { request: this.Userdata.schoolId, token: this.Userdata.token } as SendData;
    this._HelperService.GetClasses(SendData).subscribe({
      next: (response) => {
        if (response) {
          this.ClassIds = response;
          this._Share.changeisloading(false);
          this.apierror = '';
        }
      },
      error: (err) => {
        this.apierror = err.error.message;
        this._Share.changeisloading(false);
      }
    });
  }
  GetSubjects() {
    this._Share.changeisloading(true);
    let SendData = { request: this.Userdata.schoolId, token: this.Userdata.token } as SendData;
    this._HelperService.GetSubjectsInSchoolHasApplied (SendData).subscribe({
      next: (response) => {
        if (response) {
          this.SubjectIds = response;
          this._Share.changeisloading(false);
          this.apierror = '';
        }
      },
      error: (err) => {
        this.apierror = err.error.message;
        this._Share.changeisloading(false);
      }
    });
  }
  IsClassExist() {
    this._Share.changeisloading(true);
    let SendData = { request: {
      classId: this.ClassId,
      subjectId: this.SubjectId
    }, token: this.Userdata.token } as SendData;
    this._SubControlService.GetStudentsForAppliedExam(SendData).subscribe({
      next: (response) => {
        if (response) {
          this.Students = response;
          this.apierror = '';
          this._Share.changeisloading(false);
        }
      },
      error: (err) => {
        this.apierror = err.error.message;
        this._Share.changeisloading(false);
      }
    });
  }
  SaveScore() {
    if (this.IsForAll) {
      for (let i = 0; i < this.Students.length; i++) {
        if (this.Review !== undefined && this.Review !== null)
          this.Students[i].score = this.Review;
      }
      return;
    }
    if (this.StudentIndex === this.Students.length - 1) {
      alert('هذا اخر طالب');
    }
    if (this.StudentIndex > -1 && this.StudentIndex < this.Students.length) {
      this.Students[this.StudentIndex].score = this.Review;
      this.Review = undefined!;
    }
    if (this.StudentIndex < this.Students.length - 1) {
      this.StudentIndex++;
    }
  }
  SaveStudentScore() {
    this._Share.changeisloading(true);
    let SendData = { request: {
      classId: this.ClassId,
      subjectId: this.SubjectId,
      students: this.Students,
      isSave:false
    }, token: this.Userdata.token } as SendData;
    this._SubControlService.SaveStudentsForAppliedExam(SendData).subscribe({
      next: (response) => {
        if (response) {
          if (response.status === 200) {
            this.apierror = '';
            alert(response.message);
            this._Share.changeisloading(false);
            this.VAlert = false;
            this.Students=[];
          }
          else
          {
            this.apierror = response.message;
            this.VAlert = false;
          }
        }
      },
      error: (err) => {
        this.apierror = err.error.message;
        this._Share.changeisloading(false);
        this.VAlert = false;
      }
    });
  }
  ViewAlert() {
    if (this.VAlert === true)
      this.VAlert = false
    else
      this.VAlert = true
  }
}
