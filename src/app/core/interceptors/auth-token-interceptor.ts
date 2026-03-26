import { inject } from '@angular/core';
import { HttpInterceptorFn } from '@angular/common/http';
import{AuthService} from '../services/auth.service';

export const authTokenInterceptor: HttpInterceptorFn = (req, next) => {
  
  const auth = inject(AuthService);
  const token = auth.getToken();

  if(!token){
    return next(req);
  }

  const authReq = req.clone({
    setHeaders:{
      Authorization: `Bearer ${token}`,
    },
  });
  
  return next(authReq);
};
