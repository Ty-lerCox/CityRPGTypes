// Core
import { Injectable, EventEmitter, Output } from "@angular/core";
import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from "@angular/common/http";

// Firebase
import { AngularFirestore } from "@angular/fire/firestore";

// Services
import { SnackbarService } from "../snackbar/snackbar.service";

// Interface & Settings
import { Bank } from "../../types/bank.model";
import { environment } from "src/environments/environment";
import { EventsService } from "../events.service";

@Injectable({
  providedIn: "root",
})
export class AtmService {
  bank: Bank = {} as Bank;

  @Output() bankChanged: EventEmitter<Bank> = new EventEmitter();

  constructor(
    private firestore: AngularFirestore,
    private httpClient: HttpClient,
    private snackbarSerivce: SnackbarService,
    private eventsService: EventsService
  ) {}

  getBank(playerID: string) {
    if (playerID !== "") {
      let bank;
      this.firestore
        .doc("banks/" + playerID)
        .snapshotChanges()
        .subscribe((data: any) => {
          bank = {
            bankID: data.payload.id,
            ...(data.payload.data() as any),
          } as any;
          this.bank = bank;
          this.bankChanged.emit(bank);
        });
    }
  }

  withdrawMoney(userid: string, playerid: string, amount: number) {
    this.httpClient
      .post(
        environment.api +
          "/withdrawMoney?userid=" +
          userid +
          "&id=" +
          playerid +
          "&amount=" +
          amount,
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
            this.eventsService.addEvent("withdrawMoney", {
              withdrawAmount: amount,
            });
            this.snackbarSerivce.createSnackbar("", res.message, 2000, false);
            break;
          default:
            this.snackbarSerivce.createSnackbar("", res.message, 4000, true);
            break;
        }
      })
      .catch((err) => {});
  }

  depositMoney(userid: string, playerid: string, amount: number) {
    this.httpClient
      .post(
        environment.api +
          "/depositMoney?userid=" +
          userid +
          "&id=" +
          playerid +
          "&amount=" +
          amount,
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
            this.eventsService.addEvent("linked", { depositAmount: amount });
            this.snackbarSerivce.createSnackbar("", res.message, 2000, false);
            break;
          default:
            this.snackbarSerivce.createSnackbar("", res.message, 4000, true);
            break;
        }
      })
      .catch((err) => {});
  }

  createAccount(playerID: string): void {
    this.httpClient
      .post(
        environment.api + "/createBank?playerID=" + playerID,
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
