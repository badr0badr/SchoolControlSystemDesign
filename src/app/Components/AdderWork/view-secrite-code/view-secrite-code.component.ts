import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { ZXingScannerModule } from '@zxing/ngx-scanner';
import { Subscription } from 'rxjs';
import { User } from 'src/app/Interface/auth';
import { SendData } from 'src/app/Interface/data';
import { ShareService } from 'src/app/Services/share.service';
import { SubControlService } from 'src/app/Services/sub-control.service';

@Component({
  selector: 'app-view-secrite-code',
  standalone: true,
  imports: [ZXingScannerModule, BrowserModule, FormsModule],
  templateUrl: './view-secrite-code.component.html',
  styleUrl: './view-secrite-code.component.css',
})
export class ViewSecriteCodeComponent {
  hasPermission: boolean | null = null;
  apierror: string = '';
  VAlert: boolean = false;
  SecriteCode: string = '';
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
    this.AddExamResult(result as unknown as number);
  }
  onPermissionResponse(permission: boolean) {
    this.hasPermission = permission;
  }
  AddExamResult(code: number) {
    this._ShareService.changeisloading(true);
    this.apierror = '';
    let SendData = { request: code, token: this.Userdata.token } as SendData;
    this._SubControlService.CheakCode(SendData).subscribe({
      next: (response) => {
        if (response) {
          if (response.status === 200) {
            this.SecriteCode = response.message;
            this._ShareService.changeisloading(false);
            this.apierror = '';
            this.VAlert = true;
          }
          else {
            this.apierror = response.message;
            this._ShareService.changeisloading(false);
          }
        }
      },
      error: (err) => {
        this.apierror = err.error.message;
        this._ShareService.changeisloading(false);
      }
    });
  }
}
