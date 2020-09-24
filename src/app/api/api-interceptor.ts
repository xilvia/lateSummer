import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
} from '@angular/common/http';
import { Injectable } from '@angular/core';

import { ApiService } from './api.service';
import { environment } from '../../environments/environment';

@Injectable()
export class ApiInterceptor implements HttpInterceptor {
  constructor(private authService: ApiService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    const apiToken = environment.glptoken;
    const apiRequest = req.clone({
      headers: req.headers.set('Authorization', 'Bearer ' + apiToken),
    });
    return next.handle(apiRequest);
  }
}
