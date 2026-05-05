import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { User } from '../Interface/auth';

@Injectable({
  providedIn: 'root'
})
export class ShareService {

  constructor() { }
  
  private SectionName = new BehaviorSubject<string>('');
  HomeSectionName = this.SectionName.asObservable();
  changeHomeSectionName(name: string) {
    this.SectionName.next(name);
  }

  private Userd = new BehaviorSubject<User>({} as User);
  UserData = this.Userd.asObservable();
  changeUserData(u: User) {
    this.Userd.next(u);
  }


  private isload = new BehaviorSubject<boolean>(false);
  isloading = this.isload.asObservable();
  changeisloading(is: boolean) {
    this.isload.next(is);
  }
}
