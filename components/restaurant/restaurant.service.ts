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
import { SnackbarService } from '../snackbar/snackbar.service';
import { StoreItem } from '../../types/storeItem.model';

@Injectable({
  providedIn: 'root',
})
export class RestaurantService {
  storeItems: StoreItem[] = [];

  @Output() storeItemsChanged: EventEmitter<StoreItem[]> = new EventEmitter();

  constructor(
    private firestore: AngularFirestore,
    private httpClient: HttpClient,
    private snackbarSerivce: SnackbarService
  ) {
    this.listenStoreItems();
  }

  listenStoreItems(): void {
    this.firestore
      .collection('storeItems')
      .snapshotChanges()
      .subscribe((data: any) => {
        let storeItems = data.map((e: any) => {
          return {
            storeItemID: e.payload.doc.id,
            ...(e.payload.doc.data() as any),
          } as StoreItem;
        });
        this.storeItems = storeItems;
        this.storeItemsChanged.emit(storeItems);
      });
  }

  requestPurchase(playerID: string, storeItemID: string, storeName: string) {
    this.httpClient
      .post(
        environment.api +
          '/buyStoreItem?playerID=' +
          playerID +
          '&storeItemID=' +
          storeItemID +
          '&storeName=' +
          storeName,
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
            break;
          default:
            this.snackbarSerivce.createSnackbar('', res.message, 4000, true);
            break;
        }
      })
      .catch((err) => {});
  }

  applyForJob(playerID: string, storeName: string) {
    this.httpClient
      .post(
        environment.api +
          '/applyForJob?playerID=' +
          playerID +
          '&storeName=' +
          storeName,
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
            break;
          default:
            this.snackbarSerivce.createSnackbar('', res.message, 4000, true);
            break;
        }
      })
      .catch((err) => {});
  }

  leaveJob(playerID: string) {
    this.httpClient
      .post(
        environment.api + '/leaveJob?playerID=' + playerID,
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
            break;
          default:
            this.snackbarSerivce.createSnackbar('', res.message, 4000, true);
            break;
        }
      })
      .catch((err) => {});
  }

  acceptPaycheck(playerID: string) {
    this.httpClient
      .post(
        environment.api + '/acceptPaycheck?playerID=' + playerID,
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
            break;
          default:
            this.snackbarSerivce.createSnackbar('', res.message, 4000, true);
            break;
        }
      })
      .catch((err) => {});
  }
}
