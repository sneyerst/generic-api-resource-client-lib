import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {FormGroup} from "@angular/forms";
import {Field} from "./field";

@Component({
  selector: 'generic-api-resource-dropdown',
  template: `
    <div [formGroup]="parentFormGroup">
      <mat-form-field>
        <mat-select placeholder="{{formComponent.label}}" formControlName="{{formComponent.name}}">
          <mat-option *ngFor="let option of formComponent.options" [value]="option.id">
            {{option.label}}
          </mat-option>
        </mat-select>
      </mat-form-field>
    </div>
  `,
  styleUrls: [],
  providers: []
})
export class DropdownComponent extends Field {

}
