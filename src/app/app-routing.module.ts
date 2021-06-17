import { UyereklamajansiComponent } from './components/uyereklamajansi/uyereklamajansi.component';
import { musteriComponent } from './components/musteri/musteri.component';
import { reklamajansiComponent } from './components/reklamajansi/reklamajansi.component';
import { AuthGuard } from './services/AuthGuard';
import { AdminUyeComponent } from './components/admin/admin-uye/admin-uye.component';
import { AdminreklamajansiComponent } from './components/admin/admin-reklamajansi/admin-reklamajansi.component';
import { AdminmusteriComponent } from './components/admin/admin-musteri/admin-musteri.component';
import { AdminComponent } from './components/admin/admin/admin.component';
import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './components/home/home.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'reklamajansi/:reklamajansiId',
    component: reklamajansiComponent
  },
  {
    path: 'musteri/:musteriId',
    component: musteriComponent
  },
  {
    path: 'uyereklamajansi/:uyeId',
    component: UyereklamajansiComponent
  },
  {
    path: 'admin',
    component: AdminComponent
  },
  {
    path: 'admin/musteri',
    component: AdminmusteriComponent,
    canActivate: [AuthGuard],
    data: {
      yetkiler: ["Admin"],
      gerigit: "/login"
    }
  },
  {
    path: 'admin/reklamajansi',
    component: AdminreklamajansiComponent
  }
  , {
    path: 'admin/reklamajansi/:reklamaID',
    component: AdminreklamajansiComponent
  },
  {
    path: 'admin/uye',
    component: AdminUyeComponent
  },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
