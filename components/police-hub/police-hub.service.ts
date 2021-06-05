import { EventEmitter, Injectable, Output } from "@angular/core";
import { AngularFirestore } from "@angular/fire/firestore";
import { PlayerExt } from "../../types/player-data.model";
import { SnackbarService } from "../snackbar/snackbar.service";
import { WantedPlayer } from "../../types/police-hub.model";
import { Location } from "../../types/location.model";
import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from "@angular/common/http";
import { environment } from "src/environments/environment";

@Injectable({
  providedIn: "root",
})
export class PoliceHUBService {
  public wantedPlayers: PlayerExt[] = [];
  location = Location;

  @Output() wantedPlayersChanged: EventEmitter<PlayerExt[]> =
    new EventEmitter();

  constructor(
    private firestore: AngularFirestore,
    private httpClient: HttpClient,
    private snackbarSerivce: SnackbarService
  ) {
    this.getWantedPlayers();
  }

  getWantedPlayers(): void {
    const wantedPlayersCollection = this.firestore.collection(
      "players",
      (ref) => ref.where("wanted", ">", 0)
    );
    wantedPlayersCollection
      .get()
      .toPromise()
      .then((wantedPlayersQuerySnapshot) => {
        let wantedPlayers = wantedPlayersQuerySnapshot.docs.map((e: any) => {
          return {
            propertyID: e.id,
            ...(e.data() as any),
          } as PlayerExt;
        });
        this.wantedPlayers = wantedPlayers;
        this.wantedPlayersChanged.emit(wantedPlayers);
      });
  }

  requestSuit(playerID: string, itemID: string) {
    this.httpClient
      .post(
        environment.api +
          "/spawnItem?playerID=" +
          playerID +
          "&itemID=" +
          itemID,
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

  requestJob(playerID: string, jobAcceptCriteria: number) {
    this.httpClient
      .post(
        environment.api +
          "/acceptJob?playerID=" +
          playerID +
          "&jobAcceptCriteria=" +
          jobAcceptCriteria,
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
