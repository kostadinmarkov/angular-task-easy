import {Routes} from '@angular/router';
import {LoginComponent} from './component/login/login-component';
import {AuthGuard} from './core/guard/auth.guard';
import {LoginGuard} from './core/guard/login.guard';
import {BoardComponent} from './component/board/board.component';
import {TicketComponent} from './component/ticket/ticket.component';

export const LOGIN_PATH = '/login';
export const DASHBOARD_PATH = '/dashboard';

export const routes: Routes = [
  {path: '', redirectTo: LOGIN_PATH, pathMatch: 'full'},
  {path: 'login', component: LoginComponent, canActivate: [LoginGuard]},
  {path: 'dashboard', component: BoardComponent, canActivate: [AuthGuard]},
  {path: 'edit/:id', component: TicketComponent, canActivate: [AuthGuard]},
  {path: 'create', component: TicketComponent, canActivate: [AuthGuard]},
  {path: '**', redirectTo: LOGIN_PATH}
];
