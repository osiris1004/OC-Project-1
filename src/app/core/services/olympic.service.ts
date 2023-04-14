import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class OlympicService {
  private olympicUrl = './assets/mock/olympic.json';
  private olympics$ = new BehaviorSubject<any>(undefined);

  constructor(private http: HttpClient) {}

  loadInitialData() {
    return this.http.get<any>(this.olympicUrl).pipe(
      tap((value) => this.olympics$.next(value)), 
      catchError((error, caught) => {
        // TODO: improve error handling
        let errorMessage = ''
                if(error.error instanceof ErrorEvent){
                  errorMessage = `Error : ${error.error.message}`
                  console.error(errorMessage);
                }else{
                  errorMessage = `Error Code: ${error.status}\nMessage : ${error.message}`
                  console.error(errorMessage);
                }
        this.olympics$.next(null);
        return caught;
      })
    );
  }

  getOlympics() {
    return this.olympics$.asObservable();
  }
}
