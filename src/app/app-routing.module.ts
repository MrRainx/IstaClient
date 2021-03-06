import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {LoginComponent} from './components/login/login.component';
import {HeaderComponent} from './components/header/header.component';

const routes: Routes = [
  {path: '', pathMatch: 'full', redirectTo: 'dash'},
  {path: 'login', component: LoginComponent},
  {
    path: '',
    component: HeaderComponent,
    children: [
      {
        path: 'dash',
        loadChildren: () =>
          import('./views/dashboard/dashboard.module').then(
            m => m.DashboardModule
          )
      },
      {
        path: 'fichas',
        loadChildren: () =>
          import('./components/fichas-dashboard/fichas-dashboard.module').then(
            m => m.FichasDashboardModule
          )
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
