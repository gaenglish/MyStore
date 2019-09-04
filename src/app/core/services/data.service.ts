import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse, HttpParams, HttpHeaders } from '@angular/common/http';
import { timer, Observable, Subject, throwError } from 'rxjs';
import { catchError, finalize } from 'rxjs/operators';
import { ApiRequest } from '../models/api-request.model';
import { OAuthService } from 'angular-oauth2-oidc';
import { environment } from '../../../environments/environment';
import { Router } from '@angular/router';
import { switchMap } from 'rxjs/internal/operators/switchMap';
import { takeWhile } from 'rxjs/internal/operators/takeWhile';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  // Define the internal Subject we'll use to push the command count
  public pendingCommandsSubject = new Subject<number>();
  public pendingCommandCount = 0;

  // Provide the *public* Observable that clients can subscribe to
  public pendingCommands$: Observable<number>;

  public ImpersonateAuthToken: string = null;


  constructor(
    public http: HttpClient,
    private oauthService: OAuthService,
    private router: Router
  ) {
    this.pendingCommands$ = this.pendingCommandsSubject.asObservable();
  }
  public get(url: string, params?: any, base_url = null, responseType = 'json'): Observable<Response | HttpResponse<object>> {
    const options = new ApiRequest();
    options.method = 'GET';
    options.url = url;
    options.params = params;
    options.base_url = base_url;
    options.responseType = responseType;
    return this.request(options);
  }

  public noCacheGet(url: string, params?: any, base_url = null, responseType = 'json'): Observable<Response | HttpResponse<object>> {
    const options = new ApiRequest();
    options.method = 'GET';
    options.url = url;
    options.params = params;
    options.base_url = base_url;
    options.responseType = responseType;
    options.headers = {
      'Cache-Control': 'no-cache, no-store, must-revalidate, post-check=0, pre-check=0',
      'Pragma': 'no-cache',
      'Expires': '0'
    };
    return this.request(options);
  }


  /**
   * Poll is used to repeatedly call an end-point using a set interval in seconds.
   * use subscribe() to start the polling and unsubscribe() to stop the polling.
   *
   * @param url
   * @param intervalSeconds - Set value using whole seconds.
   * @param params - Optional
   * @param base_url - Optional
   * @param isSuccessFn - Optional (uses basic 200 response status check if not set)
   */
  public poll(url: string, intervalSeconds, params?: any, base_url = null, isSuccessFn = this._genericSuccessCheck): Observable<any> {
    return timer(0, intervalSeconds * 1000).pipe(
      switchMap(() => this.get(url, params, base_url)),
      takeWhile((response) => isSuccessFn(response))
    );
  }
  private _genericSuccessCheck = (response) => response.status === 200;

  public post(url: string, data?: any, params?: any, base_url = null): Observable<Response | HttpResponse<Object>> {
    if (!data) {
      data = params;
      params = {};
    }
    const options = new ApiRequest();
    options.method = 'POST';
    options.url = url;
    options.params = params;
    options.data = data;
    options.base_url = base_url;
    return this.request(options);
  }

  public put(url: string, data?: any, params?: any, base_url = null): Observable<Response | HttpResponse<Object>> {
    if (!data) {
      data = params;
      params = {};
    }
    const options = new ApiRequest();
    options.method = 'PUT';
    options.url = url;
    options.params = params;
    options.data = data;
    options.base_url = base_url;
    return this.request(options);
  }

  public delete(url: string, base_url = null): Observable<Response | HttpResponse<Object>> {
    const options = new ApiRequest();
    options.method = 'DELETE';
    options.url = url;
    options.base_url = base_url;
    return this.request(options);
  }

  private request(options: ApiRequest): Observable<Response | HttpResponse<Object>> {
    options.method = (options.method || 'GET');
    options.url = (options.url || '');
    options.headers = (options.headers || {});
    options.params = (options.params || {});
    options.data = (options.data || {});
    this.interpolateUrl(options);
    // this.addXsrfToken(options);
    this.addContentType(options);

    if (environment.settings.ADD_AUTH_TOKEN) {
      this.addAuthToken(options);
    }

    // this.addCors(options);

    const requestOptions = {
      headers: new HttpHeaders(options.headers),
      params: new HttpParams({ fromObject: options.params })
    };

    // tslint:disable-next-line:max-line-length
    this.pendingCommandsSubject.next(++this.pendingCommandCount);

    return this.http
      .request(options.method, options.base_url ? (options.base_url + options.url) : (environment.settings.API_BASE_URL + options.url), {
        body: JSON.stringify(options.data),
        headers: requestOptions.headers,
        params: requestOptions.params,
        responseType: options.responseType ? options.responseType : 'json',
        observe: 'response'
      })
      .pipe(
        catchError(err => {
          return throwError(err);
        }),
        finalize(() => {
            this.pendingCommandsSubject.next(--this.pendingCommandCount);
            // console.log(this.pendingCommandCount);
          }
        )
      );
  }
  private addContentType(options: ApiRequest): ApiRequest {
    // if (options.method !== RequestMethod.Get) {
    options.headers['Content-Type'] = 'application/json; charset=UTF-8';
    // }
    return options;
  }

  private addAuthToken(options: ApiRequest): ApiRequest {

    const authTokens = this.oauthService.getAccessToken();
    if (authTokens || this.ImpersonateAuthToken) {
      options.headers.Authorization = 'Bearer ' + (this.ImpersonateAuthToken ? this.ImpersonateAuthToken : authTokens);
    }

    return options;
  }

  setImpersonateToken(token) {

    this.ImpersonateAuthToken = token;
  }

  private extractValue(collection: any, key: string): any {
    const value = collection[key];
    delete (collection[key]);
    return value;
  }

  private addXsrfToken(options: ApiRequest): ApiRequest {
    const xsrfToken = this.getXsrfCookie();
    if (xsrfToken) {
      options.headers['X-XSRF-TOKEN'] = xsrfToken;
    }
    return options;
  }

  private getXsrfCookie(): string {
    const matches = document.cookie.match(/\bXSRF-TOKEN=([^\s;]+)/);
    try {
      return matches ? decodeURIComponent(matches[1]) : '';
    } catch (decodeError) {
      return '';
    }
  }

  private addCors(options: ApiRequest): ApiRequest {
    options.headers['Access-Control-Allow-Origin'] = '*';
    return options;
  }

  private buildUrlSearchParams(params: any): URLSearchParams {
    const searchParams = new URLSearchParams();
    for (const key in params) {
      if (params.hasOwnProperty(key)) {
        searchParams.append(key, params[key]);
      }
    }
    return searchParams;
  }

  private interpolateUrl(options: ApiRequest): ApiRequest {
    options.url = options.url.replace(/:([a-zA-Z]+[\w-]*)/g, ($0, token) => {
      // Try to move matching token from the params collection.
      if (options.params.hasOwnProperty(token)) {
        return (this.extractValue(options.params, token));
      }
      // Try to move matching token from the data collection.
      if (options.data.hasOwnProperty(token)) {
        return (this.extractValue(options.data, token));
      }
      // If a matching value couldn't be found, just replace
      // the token with the empty string.
      return ('');
    });
    // Clean up any repeating slashes.
    options.url = options.url.replace(/\/{2,}/g, '/');
    // Clean up any trailing slashes.
    options.url = options.url.replace(/\/+$/g, '');

    return options;
  }

  private handleErrors(error: any) {
    console.log('this error handler is still happening');
  }
}
