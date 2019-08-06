import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {FormGroup} from "@angular/forms";
import {Field} from "./field";

@Component({
  selector: 'generic-api-resource-timefield',
  template: `
      <div [formGroup]="parentFormGroup">
          <mat-form-field>
              <mat-label>{{formComponent.label}}</mat-label>
              <input matInput placeholder="HH:MM" formControlName="{{formComponent.name}}">
          </mat-form-field>
      </div>
  `,
  styleUrls: [],
  providers: []
})
export class TimefieldComponent extends Field {

}
