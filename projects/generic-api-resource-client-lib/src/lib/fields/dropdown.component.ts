import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {FormGroup} from "@angular/forms";
import {Field} from "./field";

@Component({
  selector: 'generic-api-resource-dropdown',
  template: `
    <div [formGroup]="parentFormGroup">
      <mat-form-field>
        <mat-select placeholder="{{formComponent.label}}" formControlName="{{formComponent.name}}">

          <ng-container *ngFor="let option of formComponent.options">

            <mat-option *ngIf="option.label" [value]="option.id">
              {{option.label}}
            </mat-option>

            <ng-container *ngIf="option.groups">
              <mat-optgroup *ngFor="let group of option.groups" [label]="group.label">
                <mat-option *ngFor="let subOption of group.options" [value]="subOption.id">
                  {{subOption.label}}
                </mat-option>
              </mat-optgroup>
            </ng-container>

          </ng-container>

        </mat-select>
      </mat-form-field>
    </div>
  `,
  styleUrls: [],
  providers: []
})
export class DropdownComponent extends Field {

}
