import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {FormGroup} from "@angular/forms";
import {Field} from "./field";

@Component({
  selector: 'generic-api-resource-textarea',
  template: `
    <div [formGroup]="parentFormGroup">
      <mat-form-field>
        <mat-label>{{formComponent.label}}</mat-label>
        <textarea matInput formControlName="{{formComponent.name}}"></textarea>
      </mat-form-field>
    </div>
  `,
  styleUrls: [],
  providers: []
})
export class TextareaComponent extends Field {
}
