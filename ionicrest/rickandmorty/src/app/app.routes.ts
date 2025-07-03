import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'intro',
    pathMatch: 'full',
  },
  {
    path: 'home',
    loadComponent: () => import('./page/home/home.page').then( m => m.HomePage)
  },
  {
    path: 'intro',
    loadComponent: () => import('./page/intro/intro.page').then( m => m.IntroPage)
  },
  {
    path: 'character-detail/:id',
    loadComponent: () => import('./page/character-detail/character-detail.page').then( m => m.CharacterDetailPage)
  },
];
