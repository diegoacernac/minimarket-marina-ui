import { Routes } from '@angular/router';
import { NotFoundComponent } from './core/components/not-found/not-found.component';
import { LoginComponent } from './pages/login/login.component';
import { authGuard } from './core/guards/auth.guard';

export const routes: Routes = [
    { 
        path: '', 
        redirectTo: 'login', 
        pathMatch: 'full' 
    },
    {
        path: 'login',
        title: 'Inicia sesión',
        component: LoginComponent,
    },
    { 
        path: 'home', 
        loadComponent: () => 
            import('./pages/home/home.component').then(m => m.HomeComponent),
        canActivate: [authGuard],
    },
    {
        path: '**',
        component: NotFoundComponent
    }
];
