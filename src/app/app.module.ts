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
import { AddAppliedExamComponent } from "./Components/AdderWork/add-applied-exam/add-applied-exam.component";
import { PdfsComponent } from "./Components/ViewerWork/pdfs/pdfs.component";
import { AddWorkersComponent } from "./Components/CMWork/add-workers/add-workers.component";
import { HallSummaryDataComponent } from "./Components/ViewerWork/hall-summary-data/hall-summary-data.component";
import { AddExamResultComponent } from "./Components/AdderWork/add-exam-result/add-exam-result.component";
import { ViewSecriteCodeComponent } from "./Components/AdderWork/view-secrite-code/view-secrite-code.component";

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
    AddWorkersComponent,
    HallSummaryDataComponent,
    AddExamResultComponent,
    ViewSecriteCodeComponent
], providers: [provideHttpClient(withInterceptorsFromDi())] })
export class AppModule { }
