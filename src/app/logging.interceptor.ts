import {Injectable} from '@angular/core';
import {HttpEvent, HttpEventType, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Observable} from 'rxjs';
import {tap} from 'rxjs/operators';

@Injectable()
export class LoggingInterceptor implements HttpInterceptor {

  constructor() {
  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    console.log('Outgoing request');
    console.log(request.url);
    console.log(request.headers);
    return next.handle(request).pipe(tap(event => {
      if (event.type === HttpEventType.Response) {
        console.log('Incoming response');
        console.log(event.body);
      }
    }));
  }
}
