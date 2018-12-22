import { Injectable } from '@angular/core';
import {Http, RequestOptions, Headers} from '@angular/http';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable,  throwError } from 'rxjs';
import { map, catchError, retry } from 'rxjs/internal/operators';
/**Env file */
import { environment } from 'src/environments/environment';
/**Services */
import { ContextService } from '../context.service';
import { Randompunkinterface } from 'src/app/models/randompunkinterface';

@Injectable({
  providedIn: 'root'
})
export class PunkService {
  private punkRootEndPpoint: string = environment.punkEndPoint;
  private randomPunkAPI: string = this.punkRootEndPpoint + "beers/random";
  private randomNonAlcoholinPunkAPI: string = this.punkRootEndPpoint + "beers";
  private randomSearchPunkAPI: string = this.punkRootEndPpoint + "beers";

  constructor(private http: HttpClient, private appContext: ContextService) {}


  public getRandomPunk(): Observable<Randompunkinterface> {
    return this.http.get<any>(this.randomPunkAPI)
      .pipe(
        retry(3),
        map(
          (data) => {
            return data[0];
          }),
        catchError(this.appContext.handleError('getRandomPunk'))
      ) as Observable<any>;
  }

  public getNonAlcoholicPunk():  Observable<Randompunkinterface> {
    /**For non alcoholic; abv <= 0.05 */
    //let params = new HttpParams().set('abv_lt', "1");
    let params = {
      'abv_gt': "0",
      'abv_lt': "1",
      'per_page': '80',
    };
    return this.http.get<any>(this.randomNonAlcoholinPunkAPI, {params: params})
      .pipe(
        retry(1),
        map(
          (data) => {
            return data[0];
          }),
        catchError(this.appContext.handleError('getNonAlcoholicPunk'))
      ) as Observable<any>;
  }

  public searchPunks(queryString: string, option: string): Observable<Randompunkinterface[]> {
    /**Send params as per selected search by option */
    /**It's looks like API server searching for both description and name on beer_name field. */
    let params = new HttpParams().set("beer_name", queryString);
    return this.http.get<any>(this.randomSearchPunkAPI, {params: params})
      .pipe(
        retry(1),
        map(
          (data) => {
            return data;
          }),
        catchError(this.appContext.handleError('searchPunks'))
      ) as Observable<any>;
  }

  


}
