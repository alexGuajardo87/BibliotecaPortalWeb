import { HttpInterceptorFn, HttpErrorResponse } from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const router = inject(Router);

  const authReq = req.clone({
    withCredentials: true, 
    setHeaders: {
      'Accept': 'application/json',
      'X-Requested-With': 'XMLHttpRequest' 
    }
  });

  return next(authReq).pipe();
};