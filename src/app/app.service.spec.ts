import { TestBed, inject, getTestBed } from '@angular/core/testing';

import { AppService } from './app.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';



describe('AppService', () => {

  let injector: TestBed;
  let service: AppService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [AppService]
    });
    injector = getTestBed();
    service = injector.get(AppService);
    httpMock = injector.get(HttpTestingController);
  });

  it('should be created', inject([AppService], (service: AppService) => {
    expect(service).toBeTruthy();
  }));

  it('Serive file has injected successfully', inject([HttpTestingController, AppService],
    (httpMock: HttpTestingController, apiService: AppService) => {
      expect(apiService).toBeTruthy();
    }
  )
  );

  it('post service should return an success respone', () => {
    const dummyResponse = {
      'status': 'success'
    };

    const postObject = {
      'id': 20,
      'status': 'read'
    };

    service.postStatus(postObject).subscribe(res => {
      expect(res).toBeDefined();
      expect(res['status']).toEqual('success');
    });

    const req = httpMock.expectOne(`/api/submit`);
    expect(req.request.method).toBe('POST');
    req.flush(dummyResponse);
  });

});
