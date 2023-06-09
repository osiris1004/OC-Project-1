import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { Olympic } from '../models/Olympic';


@Injectable({
  providedIn: 'root',
})
export class OlympicService {
  private olympicUrl = './assets/mock/olympic.json';

  constructor(private http: HttpClient) { }

  getOlympics() :Observable <Olympic[]> {
    return this.http.get<Olympic[]>(this.olympicUrl).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.error instanceof ErrorEvent) {
          const errorMessage = `Error : ${error.error.message}`
          console.error(errorMessage);
          throw new Error(errorMessage)
        } else {
          const errorMessage = `Error Code: ${error.status}\nMessage : ${error.message}`
          console.error(errorMessage);
          throw new Error(errorMessage)
        }
      })
    );
  }
}
