import { AuthGuard } from './guards/auth.guard';
import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', loadChildren: './login/login.module#LoginPageModule' },
  {
    path: 'admin',
    loadChildren: './admin/admin.module#AdminPageModule',
    canActivate: [AuthGuard]
  },
  {
    path: 'student',
    loadChildren: './student/student.module#StudentPageModule',
    canActivate: [AuthGuard]
  },
  {
    path: 'field-admin',
    loadChildren: './field-admin/field-admin.module#FieldAdminPageModule',
    canActivate: [AuthGuard]
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
