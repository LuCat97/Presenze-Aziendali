import { Routes } from '@angular/router';
import { AdminDashboard } from './componenti/admin-dashboard/admin-dashboard';
import { ImpostaPresenze } from './componenti/imposta-presenze/imposta-presenze';
import { ListaDipendenti } from './componenti/lista-dipendenti/lista-dipendenti';
import { Login } from './componenti/login/login';
import { RegistraDipendente } from './componenti/registra-dipendente/registra-dipendente';
import { StoricoPresenze } from './componenti/storico-presenze/storico-presenze';
import { TimbraPresenza } from './componenti/timbra-presenza/timbra-presenza';
import { adminGuard } from './guard/admin-guard';
import { authGuard } from './guard/auth-guard';
import { dipendenteGuard } from './guard/dipendente-guard';
import { AdminLayout } from './layout/admin-layout/admin-layout';
import { DipendenteLayout } from './layout/dipendente-layout/dipendente-layout';

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: Login },

  {
    path: 'admin',
    component: AdminLayout,
    canActivate: [authGuard, adminGuard],
    children: [
      { path: '', component: AdminDashboard },
      { path: 'registra-dipendente', component: RegistraDipendente },
      { path: 'lista-dipendenti', component: ListaDipendenti },
      { path: 'imposta-presenze', component: ImpostaPresenze },
      { path: 'storico-presenze', component: StoricoPresenze },
    ],
  },

  {
    path: 'dipendente',
    component: DipendenteLayout,
    canActivate: [authGuard, dipendenteGuard],
    children: [
      { path: '', redirectTo: 'timbra-presenza', pathMatch: 'full' },
      { path: 'timbra-presenza', component: TimbraPresenza },
    ],
  },

  { path: '**', redirectTo: 'login' },
];
