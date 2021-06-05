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
import { PlayerDataService } from '../player-data/player-data.service';
import { SnackbarService } from '../snackbar/snackbar.service';

@Injectable({
  providedIn: 'root',
})
export class LinkService {
  constructor(
    private httpClient: HttpClient,
    private playerDataService: PlayerDataService,
    private snackbarSerivce: SnackbarService
  ) {}

  requestLink(userID: string) {
    this.httpClient
      .post(
        environment.api + '/linkAccount?userID=' + userID,
        {},
        {
          headers: new HttpHeaders({
            'Content-Type': 'application/x-www-form-urlencoded',
          }),
        }
      )
      .toPromise()
      .then((res: any) => {
        switch (res.status) {
          case 200:
            this.snackbarSerivce.createSnackbar('', res.message, 2000, false);
            this.playerDataService.getPlayer(userID);
            break;
          default:
            this.snackbarSerivce.createSnackbar('', res.message, 4000, true);
            break;
        }
      })
      .catch((err) => {
        this.snackbarSerivce.createSnackbar('Linked Account:', err, 6000, true);
      });
  }
}
