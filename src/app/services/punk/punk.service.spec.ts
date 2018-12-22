import { TestBed, inject, async } from '@angular/core/testing';

import { PunkService } from './punk.service';
import {
  HttpModule,
  Http,
  Response,
  ResponseOptions,
  XHRBackend
} from '@angular/http';
import { HttpClientModule } from '@angular/common/http';
import { MockBackend } from '@angular/http/testing';
import { MatSnackBarModule } from '@angular/material/snack-bar';

import { Randompunkinterface } from 'src/app/models/randompunkinterface';

describe('ImageService', () => {
  let service: PunkService;
  let backend: MockBackend;
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule, MatSnackBarModule],
      providers: [
        PunkService,
        { provide: XHRBackend, useClass: MockBackend },
      ]
    });
  });

  it('should be created', inject([PunkService], (service: PunkService) => {
    expect(service).toBeTruthy();
  }));

  describe('getRandomPunk()', () => {

    it('should return an Observable<Array<Randompunkinterface>>',
        inject([PunkService, XHRBackend], (punkService, mockBackend) => {

          punkService.getRandomPunk().subscribe((data) => {
          expect(data.id).toBeDefined();
        });

    }));
  });

  describe('getNonAlcoholicPunk()', () => {

    it('should return an Observable<Array<Randompunkinterface>>',
        inject([PunkService, XHRBackend], (punkService, mockBackend) => {

          punkService.getNonAlcoholicPunk().subscribe((data) => {
          expect(data.id).toBeDefined();
        });

    }));
  });

  describe('searchPunks()', () => {

    it('Valid search | By name | should return an Observable<Array<Randompunkinterface>>',
        inject([PunkService, XHRBackend], (punkService, mockBackend) => {

          punkService.searchPunks("test", "name").subscribe((data) => {
          expect(data.length).toBeGreaterThanOrEqual(1);
        });

    }));
  });


  describe('searchPunks()', () => {

    it('Valid search | By Description | should return an Observable<Array<Randompunkinterface>>',
        inject([PunkService, XHRBackend], (punkService, mockBackend) => {

          punkService.searchPunks("test", "description").subscribe((data) => {
          expect(data.length).toBeGreaterThanOrEqual(1);
        });

    }));
  });

  describe('searchPunks()', () => {

    it('Invalid search | By Name | should return an empty Observable<Array<Randompunkinterface>>',
        inject([PunkService, XHRBackend], (punkService, mockBackend) => {

          punkService.searchPunks("testdskcvlesndvnclwerldsvcewfdvn00-0", "name").subscribe((data) => {
          expect(data.length).toEqual(0);
        });

    }));
  });

  describe('searchPunks()', () => {

    it('Invalid search | By Description | should return an empty Observable<Array<Randompunkinterface>>',
        inject([PunkService, XHRBackend], (punkService, mockBackend) => {

          punkService.searchPunks("testdskcvlesndvnclwerldsvcewfdvn00-0", "description").subscribe((data) => {
          expect(data.length).toEqual(0);
        });

    }));
  });
});
