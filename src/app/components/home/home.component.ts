import { Component, OnInit } from '@angular/core';
import { Subject, BehaviorSubject } from 'rxjs';
import { catchError, finalize } from 'rxjs/internal/operators';
import { FormBuilder, FormGroup, Validators, FormArray, FormControl } from '@angular/forms';
import { throwError } from 'rxjs/index';
import { delay } from 'rxjs/operators';

/**Import Custom Services */
import { ContextService } from '../../services/context.service';
import { PunkService } from '../../services/punk/punk.service';
/**Import Interfaces */
import { Randompunkinterface } from 'src/app/models/randompunkinterface';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  public randomPunkSubject$: BehaviorSubject<Randompunkinterface> = new BehaviorSubject<Randompunkinterface>(null);
  public searchPunkData: Array<Randompunkinterface[]> = [];
  public loadingSubject$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  public loadingError$: Subject<boolean> = new Subject<boolean>();
  public searchFormGroup: FormGroup;

  constructor(private appContext: ContextService, private punkService: PunkService, private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    /**Build form instance */
    this.buildSearchForm();
  }

  ngAfterViewInit(): void{
    /**Get random punk */
    this.getRandomPunk();
  }

  buildSearchForm(): void {
    this.searchFormGroup = this.formBuilder.group({
      query: [null, Validators.required],
      option: [null, Validators.required]
    });
  }

  /**Service related methods */

  getRandomPunk(): void{
    this.punkService.getRandomPunk().pipe(
      delay(100),
      catchError((error: any) => {
        this.loadingError$.next(true);
        return throwError(error);
      }),
      finalize(() => {})
    ).subscribe(data => {
      /**push data to async pipe */
      this.randomPunkSubject$.next(data);
      /**set error to false */
      this.loadingError$.next(false);
    });
  }

  getNonAlcoholicRandomPunk(): void{
    this.punkService.getNonAlcoholicPunk().pipe(
      delay(100),
      catchError((error: any) => {
        this.loadingError$.next(true);
        return throwError(error);
      }),
      finalize(() => {})
    ).subscribe(data => {
      /**push data to async pipe */
      this.randomPunkSubject$.next(data);
      /**set error to false */
      this.loadingError$.next(false);
    });
  }

  searchPunks(): void {
    let data:any = this.searchFormGroup.value;
    let option:string = data.option;
    let query:string = data.query.replace(/ /g,"_");/**Convert space to underscore as API server requested */
    this.punkService.searchPunks(query, option).pipe(
      delay(100),
      catchError((error: any) => {
        this.loadingError$.next(true);
        return throwError(error);
      }),
      finalize(() => {})
    ).subscribe(data => {
      /**push data to async pipe */
      /**API only provide filter data for name only. let do description by loading 80 records. */
      if(option == "name"){
        this.searchPunkData = data;
      }else{
        /**If you want to search on frontend for description specific */
        //let xData = data.filter(punk => {return punk.description.includes(query)});
        this.searchPunkData = data;
      }
      
      /**set error to false */
      this.loadingError$.next(false);
    });
  }

}
