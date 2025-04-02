import { inject, Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  CanActivateFn,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { ManageService } from '../auth/service/manage.service';

export const userGuard: CanActivateFn = () => {
    const router = inject(Router);
    const manageService = inject(ManageService);
  
    const user = manageService.getUser();
    if (user && user.type === 'user') return true;
  
    return router.createUrlTree(['/login']);
  };
  