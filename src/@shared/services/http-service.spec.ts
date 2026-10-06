import { TestBed } from '@angular/core/testing';
import { HttpHeaders, HttpParams, provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { HttpService } from './http-service';

describe('HttpService', () => {
  let service: HttpService;
  let http: HttpTestingController;
  beforeEach(() => {
    TestBed.configureTestingModule({ providers: [provideHttpClient(), provideHttpClientTesting()] });
    service = TestBed.inject(HttpService);
    http = TestBed.inject(HttpTestingController);
    service.setBaseUrl('https://api.test///');
  });
  afterEach(() => http.verify());
  for (const method of ['get', 'post', 'put', 'patch', 'delete'] as const) {
    it(`sends ${method.toUpperCase()} with normalized URL, headers and query`, () => {
      const body = { name: 'Ana' };
      const params = { page: 2, active: false };
      const headers = { 'X-Clinic': '1' };
      const response = jasmine.createSpy('response');
      if (method === 'get' || method === 'delete') service[method]('patients', params, headers).subscribe(response);
      else service[method]('/patients', body, params, headers).subscribe(response);
      const req = http.expectOne('https://api.test/patients?page=2&active=false');
      expect(req.request.method).toBe(method.toUpperCase());
      expect(req.request.headers.get('X-Clinic')).toBe('1');
      expect(req.request.body).toEqual(method === 'get' || method === 'delete' ? null : body);
      req.flush(body);
      expect(response).toHaveBeenCalledWith(body);
    });
    it(`propagates ${method.toUpperCase()} API errors`, () => {
      const failure = jasmine.createSpy('failure');
      if (method === 'get' || method === 'delete') service[method]('/patients').subscribe({ error: failure });
      else service[method]('/patients', {}).subscribe({ error: failure });
      http.expectOne('https://api.test/patients').flush({ message: 'Unavailable' }, { status: 503, statusText: 'Unavailable' });
      expect(failure).toHaveBeenCalledWith({ message: 'Unavailable' });
    });
  }
  it('supports relative URLs and Angular header/parameter objects', () => {
    service.setBaseUrl('');
    service.get('patients', new HttpParams().set('q', 'Ana Silva'), new HttpHeaders().set('X-Test', 'yes')).subscribe();
    const req = http.expectOne('/patients?q=Ana%20Silva');
    expect(req.request.headers.get('X-Test')).toBe('yes');
    req.flush([]);
  });
  it('propagates network errors', () => {
    const failure = jasmine.createSpy('failure');
    service.get('/patients').subscribe({ error: failure });
    const event = new ProgressEvent('error');
    http.expectOne('https://api.test/patients').error(event);
    expect(failure).toHaveBeenCalledWith(event);
  });
});
