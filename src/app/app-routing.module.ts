import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'login',
    loadChildren: () => import('./pages/login/login.module').then(m => m.LoginPageModule)
  },
  {
    path: 'register',
    loadChildren: () => import('./pages/register/register.module').then(m => m.RegisterPageModule)
  },
  {
    path: 'Attendance',
    loadChildren: () => import('./pages/attendance/attendance.module').then(m => m.AttendancePageModule)
  },
  {
    path: 'perfil',
    loadChildren: () => import('./pages/perfil/perfil.module').then(m => m.PerfilPageModule)
  },
  {
    path: 'historial',
    loadChildren: () => import('./pages/historial/historial.module').then(m => m.HistorialPageModule)
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
