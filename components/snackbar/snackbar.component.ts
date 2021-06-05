import { Component, Inject, OnInit } from '@angular/core';
import { MatSnackBar, MAT_SNACK_BAR_DATA } from '@angular/material/snack-bar';
import { SnackbarService } from './snackbar.service';

@Component({
  selector: 'app-snackbar',
  templateUrl: './snackbar.component.html',
  styleUrls: ['./snackbar.component.scss'],
})
export class SnackbarComponent implements OnInit {
  durationInSeconds = 5;

  constructor(
    private _snackBar: MatSnackBar,
    private snackbarService: SnackbarService
  ) {}

  ngOnInit(): void {
    this.snackbarService.snackbarChanged.subscribe((snackbar: any) => {
      this.openSnackBar(snackbar);
    });
  }

  openSnackBar(snackbar: any) {
    let cssClass = 'mat-accent';
    if (snackbar.isError) {
      cssClass = 'mat-warn';
    }
    this._snackBar.openFromComponent(PizzaPartyComponent, {
      duration: snackbar.duration,
      horizontalPosition: 'right',
      verticalPosition: 'top',
      data: snackbar,
      panelClass: ['mat-toolbar', cssClass],
    });
  }
}

@Component({
  selector: 'snack-bar-component-example-snack',
  templateUrl: './snack-bar-popup.html',
  styles: [],
})
export class PizzaPartyComponent {
  snackbarData: any = {};

  constructor(@Inject(MAT_SNACK_BAR_DATA) public data: any) {
    this.snackbarData = data;
  }
}
