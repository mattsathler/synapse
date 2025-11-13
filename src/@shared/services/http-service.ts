import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class HttpService {
  private baseUrl = 'http://localhost:3000';

  constructor(private http: HttpClient) { }

  setBaseUrl(url: string) {
    this.baseUrl = url ? url.replace(/\/+$/, '') : '';
  }

  private buildUrl(path: string) {
    const p = path.startsWith('/') ? path : `/${path}`;
    return `${this.baseUrl}${p}`;
  }

  private buildOptions(headers?: HttpHeaders | { [k: string]: string }, params?: HttpParams | { [k: string]: any }) {
    const httpHeaders = headers instanceof HttpHeaders ? headers : new HttpHeaders(headers || {});
    let httpParams: HttpParams | undefined;
    if (params instanceof HttpParams) {
      httpParams = params;
    } else if (params) {
      httpParams = Object.keys(params).reduce((acc, key) => acc.set(key, String((params as any)[key])), new HttpParams());
    }
    return { headers: httpHeaders, params: httpParams };
  }

  get<T>(path: string, params?: HttpParams | { [k: string]: any }, headers?: HttpHeaders | { [k: string]: string }): Observable<T> {
    return this.http.get<T>(this.buildUrl(path), this.buildOptions(headers, params)).pipe(
      catchError(this.handleError)
    );
  }

  post<T>(path: string, body: any, params?: HttpParams | { [k: string]: any }, headers?: HttpHeaders | { [k: string]: string }): Observable<T> {
    return this.http.post<T>(this.buildUrl(path), body, this.buildOptions(headers, params)).pipe(
      catchError(this.handleError)
    );
  }

  put<T>(path: string, body: any, params?: HttpParams | { [k: string]: any }, headers?: HttpHeaders | { [k: string]: string }): Observable<T> {
    return this.http.put<T>(this.buildUrl(path), body, this.buildOptions(headers, params)).pipe(
      catchError(this.handleError)
    );
  }

  patch<T>(path: string, body: any, params?: HttpParams | { [k: string]: any }, headers?: HttpHeaders | { [k: string]: string }): Observable<T> {
    return this.http.patch<T>(this.buildUrl(path), body, this.buildOptions(headers, params)).pipe(
      catchError(this.handleError)
    );
  }

  delete<T>(path: string, params?: HttpParams | { [k: string]: any }, headers?: HttpHeaders | { [k: string]: string }): Observable<T> {
    return this.http.delete<T>(this.buildUrl(path), this.buildOptions(headers, params)).pipe(
      catchError(this.handleError)
    );
  }

  private handleError = (error: any): Observable<never> => {
    const err = error?.error ?? error?.message ?? error;
    return throwError(() => err);
  };
}
