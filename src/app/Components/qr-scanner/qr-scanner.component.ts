import { Component } from '@angular/core';
import { ZXingScannerModule } from "@zxing/ngx-scanner";
import { BrowserModule } from "@angular/platform-browser";
import { ResponseDataView } from 'src/app/Interface/data';
import { ShareService } from 'src/app/Services/share.service';
import { Subscription } from 'rxjs';
import { User } from 'src/app/Interface/auth';

@Component({
  selector: 'app-qr-scanner',
  standalone: true,
  imports: [ZXingScannerModule, BrowserModule],
  templateUrl: './qr-scanner.component.html',
  styleUrls: ['./qr-scanner.component.css'],
})
export class QrScannerComponent { 
  hasPermission: boolean | null = null;
  apierror: string = '';
  VAlert: boolean = false;
  isloading: boolean = false;
  Response: ResponseDataView = {} as ResponseDataView;
  // constructor(private _ShareService: ShareService) { }
  // private subscription1: Subscription = new Subscription();
  // Userdata: User = {} as User;
  // ngOnInit(): void {
  //   // this.subscription1 = this._ShareService.UserData.subscribe((section) => {
  //   //   this.Userdata = section;
  //   // });
  // }
  onCodeResult(result: string) {
    this.RunCode(result as unknown as number);
  }
  ViewAlert() {
    this.VAlert = false;
    this.apierror = '';
    this.Response = {} as ResponseDataView;
  }
  onPermissionResponse(permission: boolean) {
    this.hasPermission = permission;
  }
  RunCode(id: number){
    this.Response.message=id.toString();
     this.Response.status=200;
  }
}
