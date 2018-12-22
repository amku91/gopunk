import { Injectable } from '@angular/core';
import { throwError } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
/**
 * @name ContextService
 * @description Common context service for all components | Do Not add any component specific variable/method here.
 * @author Amit Kumar
 */
export class ContextService {

  constructor() { }

  public handleError(operation: string = 'operation') {
    return (error: any) => {
      error.operation = operation;
      return throwError(error);
    };
  }
}
