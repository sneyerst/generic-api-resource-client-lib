import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {FormGroup} from "@angular/forms";
import {Field} from "./field";

@Component({
  selector: 'generic-api-resource-textfield',
  template: `
    <div [formGroup]="parentFormGroup">
      <mat-form-field>
        <mat-label>{{formComponent.label}}</mat-label>
        <input matInput formControlName="{{formComponent.name}}">
      </mat-form-field>
    </div>
  `,
  styleUrls: [],
  providers: []
})
export class TextfieldComponent extends Field {

}
