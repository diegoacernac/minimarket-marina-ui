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
        loadComponent: () => import('./pages/home/home.component').then(m => m.HomeComponent),
        title: 'Home',
        canActivate: [authGuard],
    },
    {
        path: 'categories',
        loadComponent: () => import('./pages/category/category.component').then(m => m.CategoryComponent),
        title: 'Categorías',
        canActivate: [authGuard],
    },
    {
        path: 'add-category',
        loadComponent: () => import('./pages/category/category-form/category-form.component').then(m => m.CategoryFormComponent),
        title: 'Agregar categoría',
        canActivate: [authGuard],
    },
    {
        path: 'users',
        loadComponent: () => import('./pages/user/user.component').then(m => m.UserComponent),
        title: 'Usuarios',
        canActivate: [authGuard],
    },
    {
        path: 'providers',
        loadComponent: () => import('./pages/provider/provider.component').then(m => m.ProviderComponent),
        title: 'Proveedores',
        canActivate: [authGuard],
    },
    {
        path: 'orders',
        loadComponent: () => import('./pages/order/order.component').then(m => m.OrderComponent),
        title: 'Pedidos',
        canActivate: [authGuard],
    },
    {
        path: 'products',
        loadComponent: () => import ('./pages/product/product.component').then(m => m.ProductComponent),
        title: 'Productos',
        canActivate: [authGuard],
    },
    {
        path: 'add-product',
        loadComponent: () => import ('./pages/product/product-form/product-form.component').then(m => m.ProductFormComponent),
        title: 'Agregar producto',
        canActivate: [authGuard],
    },
    {
        path: 'reports',
        loadComponent: () => import('./pages/report/report.component').then(m => m.ReportComponent),
        title: 'Reportes',
        canActivate: [authGuard],
    },
    {
        path: 'profile',
        loadComponent: () => import('./pages/profile/profile.component').then(m => m.ProfileComponent),
        title: 'Perfil',
        canActivate: [authGuard],
    },
    {
        path: '**',
        component: NotFoundComponent
    }
];
