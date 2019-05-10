import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {FormGroup} from "@angular/forms";
import {Field} from "./field";

@Component({
  selector: 'generic-api-resource-hidden',
  template: `
    <div [formGroup]="parentFormGroup">
      <input type="hidden" formControlName="{{formComponent.name}}">
    </div>
  `,
  styleUrls: [],
  providers: []
})
export class HiddenFieldComponent extends Field {

}
