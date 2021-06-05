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
export class AppService {
  public hideAll = false;

  @Output() hideAllChanged: EventEmitter<boolean> = new EventEmitter();

  constructor() {}

  setHideAll() {
    this.hideAll = !this.hideAll;
    this.hideAllChanged.emit(this.hideAll);
  }
}
