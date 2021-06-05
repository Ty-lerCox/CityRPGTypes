import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

// Components
import { AppComponent } from "./app.component";
import { PlayerDataComponent } from "./components/player-data/player-data.component";

const routes: Routes = [
  {
    path: "",
    component: AppComponent,
  },
  {
    path: "playerData",
    component: PlayerDataComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
