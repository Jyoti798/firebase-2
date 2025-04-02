import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { ManageService } from '../auth/service/manage.service';

export const authGuard: CanActivateFn = () => {
  const router = inject(Router);
  const manageService = inject(ManageService);

  const user = manageService.getUser();
  if (user) return true;

  return router.createUrlTree(['/login']);
};
