import { UyereklamajansiComponent } from './components/uyereklamajansi/uyereklamajansi.component';
import { MusteriComponent } from './components/musteri/musteri.component';
import { reklamajansiComponent } from './components/reklamajansi/reklamajansi.component';
import { AuthGuard } from './services/AuthGuard';
import { AuthInterceptor } from './services/AuthInterceptor';
import { SafeHTMLPipe } from './pipes/safeHTML.pipe';
import { reklamajansiDialogComponent } from './components/dialogs/reklamajansi-dialog/reklamajansi-dialog.component';
import { MusteriDialogComponent } from './components/dialogs/Musteri-dialog/Musteri-dialog.component';
import { AdminUyeComponent } from './components/admin/admin-uye/admin-uye.component';
import { AdminMusteriComponent } from './components/admin/admin-Musteri/admin-Musteri.component';
import { AdminreklamajansiComponent } from './components/admin/admin-reklamajansi/admin-reklamajansi.component';
import { AdminComponent } from './components/admin/admin/admin.component';
import { LoginComponent } from './components/login/login.component';
import { ApiService } from './services/api.service';

import { ConfirmDialogComponent } from './components/dialogs/confirm-dialog/confirm-dialog.component';
import { MyAlertService } from './services/myAlert.service';
import { AlertDialogComponent } from './components/dialogs/alert-dialog/alert-dialog.component';
import { MaterialModule } from './material.module';
import { HomeComponent } from './components/home/home.component';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { MainNavComponent } from './components/main-nav/main-nav.component';
import { JoditAngularModule } from 'jodit-angular';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponentnent,
    MainNavComponent,
    LoginComponentponent,
    SafeHTMLPipePipe,
    reklamajansiComponent,
    MusteriComponent,
    UyereklamajansiComponent,
    
    AdminComponent,
    AdminreklamajansiComponent,
    AdminMusteriComponent,
    AdminUyeComponent,

    

    
    AlertDialogComponent,
    ConfirmDialogComponent,
    MusteriDialogComponent,
    reklamajansiDialogComponent



  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    HttpClientModule,
    ReactiveFormsModule,
    JoditAngularModule
  ],
  entryComponents: [
    AlertDialogComponent,
    ConfirmDialogComponent,
    MusteriDialogComponent,
    reklamajansiDialogComponent

  ],
  providers: [MyAlertService, ApiService, SafeHTMLPipe, AuthGuard,
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
