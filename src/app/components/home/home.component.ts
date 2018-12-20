import { Component, OnInit } from '@angular/core';
import { Subject, BehaviorSubject } from 'rxjs';
import { catchError, finalize } from 'rxjs/internal/operators';
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

  public randomPunkSubject$: BehaviorSubject<Randompunkinterface[]> = new BehaviorSubject<Randompunkinterface[]>(null);
  public loadingSubject$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  public loadingError$: Subject<boolean> = new Subject<boolean>();

  constructor(private appContext: ContextService, private punkService: PunkService) { }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void{
    /**Get random punk */
    this.getRandomPunk();
  }

  getRandomPunk(): void{
    this.punkService.getRandomPunk().pipe(
      delay(2000),
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
      delay(2000),
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

}
