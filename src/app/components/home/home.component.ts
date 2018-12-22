import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
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

  /**Random punk section vars */
  public randomPunkSubject$: BehaviorSubject<Randompunkinterface> = new BehaviorSubject<Randompunkinterface>(null);
  /**Search punk section vars */
  public searchPunkSubject$: BehaviorSubject<Randompunkinterface> = new BehaviorSubject<Randompunkinterface>(null);
  public searchStarted: boolean = false;
  public searchFormGroup: FormGroup;

  public loadingError$: Subject<boolean> = new Subject<boolean>();

  constructor(private appContext: ContextService, private punkService: PunkService, private formBuilder: FormBuilder,
    private cdRef: ChangeDetectorRef) { }

  ngOnInit(): void {
    /**Build form instance */
    this.buildSearchForm();
  }

  ngAfterViewInit(): void {
    /**Get random punk */
    this.getRandomPunk();
    /**Detect changes */
    this.cdRef.detectChanges();
  }

  buildSearchForm(): void {
    this.searchFormGroup = this.formBuilder.group({
      query: [null, Validators.compose([Validators.required])],
      option: [null, Validators.required]
    });
  }

  /**Service related methods */

  getRandomPunk(): void {
    /**Reinitialise subject to handle loader, error, and data */
    this.randomPunkSubject$ = new BehaviorSubject<Randompunkinterface>(null);
    this.loadingError$.next(false);
    this.punkService.getRandomPunk().pipe(
      delay(5),
      catchError((error: any) => {
        this.loadingError$.next(true);
        return throwError(error);
      }),
      finalize(() => { })
    ).subscribe(data => {
      /**push data to async pipe */
      this.randomPunkSubject$.next(data);
      /**set error to false */
      this.loadingError$.next(false);
    });
  }

  getNonAlcoholicRandomPunk(): void {
    /**Reinitialise subject to handle loader, error, and data */
    this.randomPunkSubject$ = new BehaviorSubject<Randompunkinterface>(null);
    this.loadingError$.next(false);
    this.punkService.getNonAlcoholicPunk().pipe(
      delay(5),
      catchError((error: any) => {
        this.loadingError$.next(true);
        return throwError(error);
      }),
      finalize(() => { })
    ).subscribe(data => {
      /**push data to async pipe */
      this.randomPunkSubject$.next(data);
      /**set error to false */
      this.loadingError$.next(false);
    });
  }

  searchPunks(): void {
    /**Reinitialise subject to handle loader, error, and data */
    this.searchPunkSubject$ = new BehaviorSubject<Randompunkinterface>(null);
    this.loadingError$.next(false);
    this.searchStarted = true;
    /**Get Form Data */
    let data: any = this.searchFormGroup.value;
    let option: string = data.option;
    let query: string = data.query.replace(/ /g, "_");/**Convert space to underscore as API server requested */
    this.punkService.searchPunks(query, option).pipe(
      delay(5),
      catchError((error: any) => {
        this.loadingError$.next(true);
        return throwError(error);
      }),
      finalize(() => { })
    ).subscribe(data => {
      /**push data to async pipe */
      /**API only provide filter data for name only. let do description by loading 80 records. */
      if (option == "name") {
        this.searchPunkSubject$.next(data);
      } else {
        /**If you want to search on frontend for description specific */
        //let xData = data.filter(punk => {return punk.description.includes(query)});
        this.searchPunkSubject$.next(data);
      }

      /**set error to false */
      this.loadingError$.next(false);
    });
  }

}
