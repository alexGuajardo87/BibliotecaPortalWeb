import { HttpInterceptorFn } from '@angular/common/http';

export const authInterceptor: HttpInterceptorFn = (req, next) => {

    const cookie = document.cookie
        .split('; ')
        .find(row => row.startsWith('XSRF-TOKEN='));

    const token = cookie
        ? decodeURIComponent(
            cookie.substring('XSRF-TOKEN='.length)
        )
        : '';

    const authReq = req.clone({
        withCredentials: true,
        setHeaders: {
            Accept: 'application/json',
            'X-Requested-With': 'XMLHttpRequest',
            ...(token
                ? {
                    'X-XSRF-TOKEN': token
                }
                : {})
        }
    });

    return next(authReq);
};
