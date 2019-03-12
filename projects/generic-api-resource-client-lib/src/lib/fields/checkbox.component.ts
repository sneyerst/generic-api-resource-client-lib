import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {FormGroup} from "@angular/forms";
import {Field} from "./field";

@Component({
  selector: 'generic-api-resource-checkbox',
  template: `
    <div [formGroup]="parentFormGroup">
      <mat-checkbox [formControlName]="formComponent.name">{{formComponent.label}}</mat-checkbox>
    </div>
  `,
  styleUrls: [],
  providers: []
})
export class CheckboxComponent extends Field {

}
