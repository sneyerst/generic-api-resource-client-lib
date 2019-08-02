import {Component, Inject} from "@angular/core";
import {MAT_SNACK_BAR_DATA} from "@angular/material";

@Component({
  selector: 'form-error-snack-bar',
  template: `Couldn't save your changes because of validation errors:<br/>
  <ul>
      <li *ngFor="let error of data">{{error}}</li>
  </ul>
  `,
  styles: [],
})
export class FormErrorSnackBarComponent {

  constructor(@Inject(MAT_SNACK_BAR_DATA) public data: any) { }


}
