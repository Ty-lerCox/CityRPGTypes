import { Component } from "@angular/core";
import { AngularFireAuth } from "@angular/fire/auth";
import { AngularFirestore } from "@angular/fire/firestore";
import { environment } from "src/environments/environment";
import { AppService } from "./app.service";
import { EventsService } from "./components/events.service";
import { LoginService } from "./components/login/login.service";
import { PlayerDataService } from "./components/player-data/player-data.service";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"],
})
export class AppComponent {
  title = "piratesweb";
  players: any;
  loggedin = false;
  playerExists = false;
  hideAll = false;

  constructor(
    private loginService: LoginService,
    private angularFireAuth: AngularFireAuth,
    private playerDataService: PlayerDataService,
    private appService: AppService,
    private eventsService: EventsService
  ) {}

  ngOnInit() {
    if (environment.production) {
      this.angularFireAuth.onAuthStateChanged((user) => {
        if (user) {
          this.loginService.setUID(user.uid);
          this.loggedin = true;
        }
      });
    } else {
      this.loginService.setUID(environment.uid);
      this.loggedin = true;
    }

    this.playerDataService.playerChanged.subscribe((player) => {
      if (player) {
        this.playerExists = true;
      }
    });

    this.appService.hideAllChanged.subscribe((hideAll: boolean) => {
      this.hideAll = hideAll;
    });
  }
}
