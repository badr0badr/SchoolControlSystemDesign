import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Subscription } from 'rxjs';
import { User } from 'src/app/Interface/auth';
import { HallSammryData, SendData } from 'src/app/Interface/data';
import { ShareService } from 'src/app/Services/share.service';
import { SubControlService } from 'src/app/Services/sub-control.service';

@Component({
  selector: 'app-hall-summary-data',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './hall-summary-data.component.html',
  styleUrl: './hall-summary-data.component.css',
})
export class HallSummaryDataComponent {
  halls: HallSammryData[] = [];
constructor(private _Share: ShareService, private _SubControlService: SubControlService) { }
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
    let SendData = { request: this.Userdata.schoolId, token: this.Userdata.token } as SendData;
    this._SubControlService.HallSummryDatas(SendData).subscribe({
      next: (response) => {
        if (response) {
          this.halls = response;
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
  print(): void {
    window.print();
  }

}
