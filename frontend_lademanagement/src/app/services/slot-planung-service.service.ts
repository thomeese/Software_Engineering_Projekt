import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';

interface SlotJSON {
  start: number;
  stop: number;
}


@Injectable({
  providedIn: 'root'
})
export class SlotPlanungServiceService {

  constructor(private http: HttpClient) {}

  //Holt alle eigenen gebuchten Slots
  getOwnSlots(): Observable<SlotJSON[]> {
    return this.http.get<SlotJSON[]>("<url>/rest/planung")
  }

  //Holt alle freien Zeitraeume
  getFreeSlots(): Observable<SlotJSON[]> {
    return this.http.get<SlotJSON[]>("<url>/rest/planung?frei=1");
  }
}
