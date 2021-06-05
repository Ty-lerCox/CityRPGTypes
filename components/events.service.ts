import { Injectable } from "@angular/core";
import { AngularFireAnalytics } from "@angular/fire/analytics";
import { FirebaseEvent } from "../types/event.model";

@Injectable({
  providedIn: "root",
})
export class EventsService {
  constructor(private analytics: AngularFireAnalytics) {}

  addEvent(name: string, params: any): void {
    const event: FirebaseEvent = {
      name: name,
      parameters: params,
    };
    this.analytics.logEvent(event.name, event.parameters).then(() => {});
  }
}
