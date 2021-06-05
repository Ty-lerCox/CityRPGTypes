// Core
import { Injectable, EventEmitter, Output } from '@angular/core';
import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from '@angular/common/http';

// Firebase
import { AngularFirestore } from '@angular/fire/firestore';

// Interface & Settings
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class SnackbarService {
  @Output() snackbarChanged: EventEmitter<any> = new EventEmitter();

  constructor() {}

  getSnackbar(): any {}

  createSnackbar(
    header: string,
    message: string,
    duration: number,
    isError: boolean
  ) {
    this.snackbarChanged.emit({
      header: header,
      message: message,
      duration: duration,
      isError: isError,
    });
  }
}
