import { Injectable } from '@angular/core';
import {Http, RequestOptions, Headers} from '@angular/http';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable,  throwError } from 'rxjs';
import { map, catchError, retry } from 'rxjs/internal/operators';
/**Env file */
import { environment } from 'src/environments/environment';
/**Services */
import { ContextService } from '../context.service';

@Injectable({
  providedIn: 'root'
})
export class PunkService {
  private punkRootEndPpoint: string = environment.punkEndPoint;
  private randomPunkAPI: string = this.punkRootEndPpoint + "beers/random";

  constructor(private http: HttpClient, private appContext: ContextService) {}


  public getRandomPunk(): Observable<any> {
    const params: any = {};
    let headers = new HttpHeaders();
    return this.http.get<any>(this.randomPunkAPI, {headers: headers})
      .pipe(
        retry(3),
        map(
          (data) => {
            return data[0];
          }),
        catchError(this.appContext.handleError('getRandomPunk'))
      ) as Observable<any>;
  }

  


}
