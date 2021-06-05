// Core
import { Injectable, EventEmitter, Output } from "@angular/core";
import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from "@angular/common/http";

// Firebase
import { AngularFirestore } from "@angular/fire/firestore";

// Interface & Settings
import { environment } from "src/environments/environment";
import { Property } from "../../types/property.model";
import { SnackbarService } from "../snackbar/snackbar.service";

@Injectable({
  providedIn: "root",
})
export class PropertiesService {
  properties: Property[] = [];

  @Output() propertiesChanged: EventEmitter<Property[]> = new EventEmitter();

  constructor(
    private firestore: AngularFirestore,
    private httpClient: HttpClient,
    private snackbarSerivce: SnackbarService
  ) {
    this.listenProperties();
  }

  listenProperties(): void {
    this.firestore
      .collection("properties", (ref) => ref.where("isPurchased", "==", false))
      .snapshotChanges()
      .subscribe((data: any) => {
        let properties = data.map((e: any) => {
          return {
            propertyID: e.payload.doc.id,
            ...(e.payload.doc.data() as any),
          } as Property;
        });
        this.properties = properties;
        this.propertiesChanged.emit(properties);
      });
  }

  requestPurchase(playerID: string, propertyID: string) {
    this.httpClient
      .post(
        environment.api +
          "/createLot?playerID=" +
          playerID +
          "&propertyID=" +
          propertyID,
        {},
        {
          headers: new HttpHeaders({
            "Content-Type": "application/x-www-form-urlencoded",
          }),
        }
      )
      .toPromise()
      .then((res: any) => {
        switch (res.status) {
          case 200:
            this.snackbarSerivce.createSnackbar("", res.message, 2000, false);
            break;
          default:
            this.snackbarSerivce.createSnackbar("", res.message, 4000, true);
            break;
        }
      })
      .catch((err) => {});
  }
}
