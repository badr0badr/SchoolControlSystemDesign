import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { authGuard } from './guards/auth.guard';
import { NotFoundComponent } from './Components/not-found/not-found.component';
import { TeacherHomeComponent } from './Components/Home/teacher-home/teacher-home.component';
import { QrScannerComponent } from './Components/qr-scanner/qr-scanner.component';
import { LoginComponent } from './Components/Auth/login/login.component';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent, title: 'Login' },
  { path: 'thome', canActivate: [authGuard], component: TeacherHomeComponent, title: 'Home' },
  { path: 'test', component: QrScannerComponent, title: 'Test' },
  {path: '**', component: NotFoundComponent, title: 'NotFound'}

];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
