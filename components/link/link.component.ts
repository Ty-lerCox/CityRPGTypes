import { Component, OnInit } from "@angular/core";
import { LoginService } from "../login/login.service";
import { PlayerExt } from "../../types/player-data.model";
import { PlayerDataService } from "../player-data/player-data.service";
import { LinkService } from "./link.service";
import { EventsService } from "../events.service";

@Component({
  selector: "app-link",
  templateUrl: "./link.component.html",
  styleUrls: ["./link.component.scss"],
})
export class LinkComponent implements OnInit {
  userID = "";

  constructor(
    private loginService: LoginService,
    private linkService: LinkService,
    private eventsService: EventsService
  ) {
    this.userID = loginService.userID;
  }

  ngOnInit(): void {
    this.loginService.uidChanged.subscribe((userID: string) => {
      this.userID = userID;
    });
  }

  getSerial(): string {
    return this.userID.substring(0, 5);
  }

  confirm(): void {
    this.linkService.requestLink(this.userID);
    this.eventsService.addEvent("linked", { userID: this.userID });
  }
}
