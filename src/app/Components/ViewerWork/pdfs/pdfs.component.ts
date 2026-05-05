import { Component } from '@angular/core';
import { Subscription } from 'rxjs';
import { User } from 'src/app/Interface/auth';
import { SendData } from 'src/app/Interface/data';
import { HelperService } from 'src/app/Services/helper.service';
import { ShareService } from 'src/app/Services/share.service';
import { SubControlService } from 'src/app/Services/sub-control.service';

@Component({
  selector: 'app-pdfs',
  imports: [],
  templateUrl: './pdfs.component.html',
  styleUrl: './pdfs.component.css',
})
export class PdfsComponent {
PdfNames:string[]=[];

constructor(private _Share: ShareService, private _HelperService: HelperService, private _SubControlService: SubControlService) { }
  private subscription1: Subscription = new Subscription();
  Userdata: User = {} as User;
    apierror: string = '';
  ngOnInit(): void {
    this.subscription1 = this._Share.UserData.subscribe((section) => {
      this.Userdata = section;
    });
    this.GetNames();
  }
  GetNames(){
    this._Share.changeisloading(true);
    let SendData = { request: '', token: this.Userdata.token } as SendData;
    this._SubControlService.GetAllFileNamesInFolder(SendData).subscribe({
      next: (response) => {
        if (response) {
          this.PdfNames = response;
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
  Download(file: string): void {
    this._SubControlService.DownloadFile(file).subscribe({
      next: (response: Blob) => {
        if (response) {
          const Url = window.URL.createObjectURL(response);
          const a = document.createElement('a');
          a.href = Url;
          this._Share.changeisloading(false);
          a.download = file;
          document.body.appendChild(a);
          a.click();
          window.URL.revokeObjectURL(Url);
          a.remove();
          this.apierror = '';
        }
      },
      error: (err) => {
        this.apierror = 'Download Failed' + err.error.message;
        this._Share.changeisloading(false);
      }
    });
  }
}
