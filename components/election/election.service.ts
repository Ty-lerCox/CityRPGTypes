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
import { SnackbarService } from "../snackbar/snackbar.service";
import { Election } from "src/app/types/election.model";

@Injectable({
  providedIn: "root",
})
export class ElectionService {
  @Output() electionsChanged: EventEmitter<Election[]> = new EventEmitter();

  constructor(
    private firestore: AngularFirestore,
    private httpClient: HttpClient,
    private snackbarSerivce: SnackbarService
  ) {
    this.listenElections();
  }

  listenElections(): void {
    this.firestore
      .collection("elections", (ref) => ref.where("active", "==", true))
      .snapshotChanges()
      .subscribe((data: any) => {
        let elections = data.map((e: any) => {
          return {
            id: e.payload.doc.id,
            ...(e.payload.doc.data() as any),
          } as Election;
        });
        this.electionsChanged.emit(elections);
      });
  }

  requestVote(playerID: string, electionID: string): void {
    this.httpClient
      .post(
        environment.api +
          "/voteElection?playerID=" +
          playerID +
          "&electionID=" +
          electionID,
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
      .catch(() => {});
  }

  requestJoin(playerID: string, electionID: string): void {
    this.httpClient
      .post(
        environment.api +
          "/joinElection?playerID=" +
          playerID +
          "&electionID=" +
          electionID,
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
      .catch(() => {});
  }
}
