import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { ZXingScannerModule } from '@zxing/ngx-scanner';
import { Subscription } from 'rxjs';
import { User } from 'src/app/Interface/auth';
import { ResponseDataView, SendData } from 'src/app/Interface/data';
import { ShareService } from 'src/app/Services/share.service';
import { SubControlService } from 'src/app/Services/sub-control.service';

@Component({
  selector: 'app-add-exam-result',
  standalone: true,
  imports: [ZXingScannerModule, BrowserModule, FormsModule],
  templateUrl: './add-exam-result.component.html',
  styleUrl: './add-exam-result.component.css',
})
export class AddExamResultComponent {
  hasPermission: boolean | null = null;
  apierror: string = '';
  VAlert: boolean = false;
  CodeScaned: number = undefined!;
  Score: number = undefined!;
  constructor(private _ShareService: ShareService, private _SubControlService: SubControlService) { }
  private subscription1: Subscription = new Subscription();
  Userdata: User = {} as User;
  ngOnInit(): void {
    this.subscription1 = this._ShareService.UserData.subscribe((section) => {
      this.Userdata = section;
    });
  }
  onCodeResult(result: string) {
    this.CodeScaned = result as unknown as number;
    this.VAlert = true;
  }
  onPermissionResponse(permission: boolean) {
    this.hasPermission = permission;
  }
  AddExamResult() {
    this._ShareService.changeisloading(true);
    let senddata = {
      request: {
        code: this.CodeScaned,
        score: this.Score,
      }
      , token: this.Userdata.token
    } as SendData;
    this._SubControlService.AddExamResult(senddata).subscribe({
      next: (response) => {
        if (response.status === 200) {
          this.VAlert = false;
          this.apierror = '';
          this.Score = undefined!;
          this.CodeScaned = undefined!;
          alert("added");
          this._ShareService.changeisloading(false);
        } else {
          this.apierror = response.message;
          this._ShareService.changeisloading(false);
        }
      },
      error: (err: any) => {
        this._ShareService.changeisloading(false);
        this.apierror = err.error.message;
        if (err.error.errors) {
          this.apierror += '\n' + Object.values(err.error.errors).flat().join(', ');
        }
      }
    });
  }
}
