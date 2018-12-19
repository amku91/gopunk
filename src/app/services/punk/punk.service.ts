import { Injectable } from '@angular/core';
import {Http, RequestOptions, Headers} from '@angular/http';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable,  throwError } from 'rxjs';
import { map, catchError, retry } from 'rxjs/internal/operators';

@Injectable({
  providedIn: 'root'
})
export class PunkService {
  private punkRootEndPpoint
  constructor(private http: HttpClient) {}

}
