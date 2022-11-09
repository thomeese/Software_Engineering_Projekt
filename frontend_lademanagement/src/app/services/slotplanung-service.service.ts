import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';

export interface Slot {
  start: Date;
  stop: Date;
}


@Injectable({
  providedIn: 'root'
})
export class SlotplanungServiceService {

  constructor(private http: HttpClient) {}

  getOwnSlots() {
    return this.http.get<Slot[]>("<url>/rest/planung")
  }

  getFreeSlots() {
    return this.http.get<Slot[]>("<url>/rest/planung?frei=1")
  }
}
