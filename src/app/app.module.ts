import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FooterComponent } from './Components/footer/footer.component';
import { TeacherHomeComponent } from './Components/Home/teacher-home/teacher-home.component';
import { NotFoundComponent } from './Components/not-found/not-found.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { ZXingScannerModule } from '@zxing/ngx-scanner';
import { QrScannerComponent } from "./Components/qr-scanner/qr-scanner.component";
import { AddAppliedExamComponent } from "./Components/\u0650AdderWork/add-applied-exam/add-applied-exam.component";
import { PdfsComponent } from "./Components/ViewerWork/pdfs/pdfs.component";
import { AddWorkersComponent } from "./Components/CMWork/add-workers/add-workers.component";

@NgModule({ declarations: [
        AppComponent,
        FooterComponent,
        TeacherHomeComponent,
        NotFoundComponent,
    ],
    bootstrap: [AppComponent], imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    CommonModule,
    ZXingScannerModule,
    FormsModule,
    QrScannerComponent,
    AddAppliedExamComponent,
    PdfsComponent,
    AddWorkersComponent
], providers: [provideHttpClient(withInterceptorsFromDi())] })
export class AppModule { }
