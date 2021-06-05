import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { HttpClientModule } from "@angular/common/http";
import { FormsModule } from "@angular/forms";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { PlayerDataComponent } from "./components/player-data/player-data.component";

import { AngularFireModule } from "@angular/fire";
import { AngularFireAnalyticsModule } from "@angular/fire/analytics";
import { AngularFireDatabaseModule } from "@angular/fire/database";
import {
  AngularFireAuthModule,
  USE_EMULATOR as USE_AUTH_EMULATOR,
} from "@angular/fire/auth";
import { firebase, firebaseui, FirebaseUIModule } from "firebaseui-angular";

import { environment } from "src/environments/environment";
import { AtmComponent } from "./components/atm/atm.component";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { NavbarComponent } from "./components/navbar/navbar.component";

import { MatToolbarModule } from "@angular/material/toolbar";
import { MatIconModule } from "@angular/material/icon";
import { MatCardModule } from "@angular/material/card";
import { MatInputModule } from "@angular/material/input";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatButtonModule } from "@angular/material/button";
import { MatSnackBarModule } from "@angular/material/snack-bar";
import { MatProgressBarModule } from "@angular/material/progress-bar";
import { MatGridListModule } from "@angular/material/grid-list";
import { MatTableModule } from "@angular/material/table";
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";
import { MatTabsModule } from "@angular/material/tabs";
import { MatSelectModule } from "@angular/material/select";
import { MatExpansionModule } from "@angular/material/expansion";
import { MatChipsModule } from "@angular/material/chips";

import { LoginComponent } from "./components/login/login.component";
import { PropertiesComponent } from "./components/properties/properties.component";
import { QueueComponent } from "./components/queue/queue.component";
import { SnackbarComponent } from "./components/snackbar/snackbar.component";
import { LinkComponent } from "./components/link/link.component";
import { TraderComponent } from "./components/trader/trader.component";
import { LeaderboardComponent } from "./components/leaderboard/leaderboard.component";
import { PoliceHUBComponent } from "./components/police-hub/police-hub.component";
import { FontAwesomeModule } from "@fortawesome/angular-fontawesome";
import { RestaurantComponent } from "./components/restaurant/restaurant.component";
import { FlexLayoutModule } from "@angular/flex-layout";
import { HeistComponent } from "./components/heist/heist.component";
import { TownhallComponent } from "./components/townhall/townhall.component";
import { ElectionComponent } from "./components/election/election.component";
import { CarDealerComponent } from './components/car-dealer/car-dealer.component';
import { DialogComponent } from './components/dialog/dialog.component';

const firebaseUiAuthConfig: firebaseui.auth.Config = {
  signInFlow: "popup",
  signInOptions: [
    {
      requireDisplayName: false,
      provider: firebase.auth.EmailAuthProvider.PROVIDER_ID,
    },
  ],
  tosUrl: "<your-tos-link>",
  privacyPolicyUrl: "<your-privacyPolicyUrl-link>",
  credentialHelper: firebaseui.auth.CredentialHelper.GOOGLE_YOLO,
};

@NgModule({
  declarations: [
    AppComponent,
    PlayerDataComponent,
    AtmComponent,
    NavbarComponent,
    LoginComponent,
    PropertiesComponent,
    QueueComponent,
    SnackbarComponent,
    LinkComponent,
    TraderComponent,
    LeaderboardComponent,
    PoliceHUBComponent,
    RestaurantComponent,
    HeistComponent,
    TownhallComponent,
    ElectionComponent,
    CarDealerComponent,
    DialogComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    MatToolbarModule,
    MatIconModule,
    MatCardModule,
    MatInputModule,
    MatFormFieldModule,
    MatButtonModule,
    MatSnackBarModule,
    MatProgressBarModule,
    MatGridListModule,
    MatTableModule,
    MatProgressSpinnerModule,
    MatTabsModule,
    MatSelectModule,
    MatExpansionModule,
    MatChipsModule,
    FlexLayoutModule,
    FontAwesomeModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    AngularFireAnalyticsModule,
    FirebaseUIModule.forRoot(firebaseUiAuthConfig),
    BrowserAnimationsModule,
  ],
  providers: [
    {
      provide: USE_AUTH_EMULATOR,
      useValue: !environment.production ? ["localhost", 6005] : undefined,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
