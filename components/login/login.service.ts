// Core
import { Injectable, EventEmitter, Output } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  userID = '';
  @Output() uidChanged: EventEmitter<string> = new EventEmitter();

  constructor() {}

  public setUID(uid: string) {
    this.userID = uid;
    this.uidChanged.emit(uid);
  }
}
