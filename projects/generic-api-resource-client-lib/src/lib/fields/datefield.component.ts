import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {FormGroup} from "@angular/forms";
import {Field} from "./field";

@Component({
  selector: 'generic-api-resource-datefield',
  template: `
      <div [formGroup]="parentFormGroup">
          <mat-form-field>
              <mat-label>{{formComponent.label}}</mat-label>
              <input matInput [matDatepicker]="picker" formControlName="{{formComponent.name}}">
              <mat-datepicker-toggle matSuffix [for]="picker"></mat-datepicker-toggle>
              <mat-datepicker [touchUi]="true" #picker></mat-datepicker>
          </mat-form-field>
      </div>
  `,
  styleUrls: [],
  providers: []
})
export class DatefieldComponent extends Field {

}
