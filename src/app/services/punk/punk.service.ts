import { Injectable } from '@angular/core';
import {Http, RequestOptions, Headers} from '@angular/http';
import { HttpClient, HttpParams } from '@angular/common/http';
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
  private randomNonAlcoholinPunkAPI: string = this.punkRootEndPpoint + "beers";
  private randomSearchPunkAPI: string = this.punkRootEndPpoint + "beers";

  constructor(private http: HttpClient, private appContext: ContextService) {}


  public getRandomPunk(): Observable<any> {
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

  public getNonAlcoholicPunk():  Observable<any> {
    /**For non alcoholic; abv <= 0.05 */
    let params = new HttpParams().set('abv_lt', "2");
    return this.http.get<any>(this.randomNonAlcoholinPunkAPI, {params: params})
      .pipe(
        retry(1),
        map(
          (data) => {
            console.log("NON alcholoic data logged");
            console.log(data);
            return data[0];
          }),
        catchError(this.appContext.handleError('getNonAlcoholicPunk'))
      ) as Observable<any>;
  }

  public searchPunk(name: string, description: string): Observable<any> {
    const params: any = {};
    /**Send params as per selected search by option */
    if(name != ""){
      params["beer_name"] =  name;
    }
    if(description != ""){
      params["beer_description"] =  description;
    }
    return this.http.get<any>(this.randomSearchPunkAPI, params)
      .pipe(
        retry(1),
        map(
          (data) => {
            console.log("search punk data logged");
            console.log(data);
            return data[0];
          }),
        catchError(this.appContext.handleError('searchPunk'))
      ) as Observable<any>;
  }

  


}
