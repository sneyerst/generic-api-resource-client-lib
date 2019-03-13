import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {Form, FormArray, FormBuilder, FormGroup} from "@angular/forms";
import {Field} from "./field";

@Component({
  selector: 'generic-api-resource-table',
  template: `
    <div [formGroup]="parentFormGroup">
      <h2>{{formComponent.label}}</h2>
      <table>

        <tr formArrayName="{{formComponent.name}}"
            *ngFor="let item of getControlsFor(formComponent.name); let i = index;">
          <ng-container [formGroupName]="i">
            <td
              *ngIf="!formComponent.children[i].trigger || !item.value[formComponent.children[i].trigger]">{{formComponent.children[i].label}}</td>


            <ng-container *ngFor="let childComponent of formComponent.children[i].fields">
              <td>
                <generic-api-resource-textfield [parentFormGroup]="getControlsFor(formComponent.name)[i]"
                                                [formComponent]="childComponent"
                                                *ngIf="childComponent.type == 'textfield'"></generic-api-resource-textfield>
                <generic-api-resource-textarea [parentFormGroup]="getControlsFor(formComponent.name)[i]"
                                               [formComponent]="childComponent"
                                               *ngIf="childComponent.type == 'textarea'"></generic-api-resource-textarea>
                <generic-api-resource-checkbox [parentFormGroup]="getControlsFor(formComponent.name)[i]"
                                               [formComponent]="childComponent"
                                               *ngIf="childComponent.type == 'checkbox'"></generic-api-resource-checkbox>
                <generic-api-resource-dropdown [parentFormGroup]="getControlsFor(formComponent.name)[i]"
                                               [formComponent]="childComponent"
                                               *ngIf="childComponent.type == 'dropdown'"></generic-api-resource-dropdown>
                <generic-api-resource-files [parentFormGroup]="getControlsFor(formComponent.name)[i]"
                                            [formComponent]="childComponent"
                                            *ngIf="childComponent.type == 'files'"></generic-api-resource-files>
              </td>
            </ng-container>


          </ng-container>
        </tr>

      </table>

      <button mat-raised-button color="primary" (click)="addChild(formComponent.new, formComponent.fields)"
              *ngIf="formComponent.new">Add
        item
      </button>


    </div>
  `,
  styleUrls: [],
  providers: []
})
export class TableComponent extends Field {

  constructor(private formBuilder: FormBuilder) {
    super();
  }

  addChild(data, fields) {
    (this.parentFormGroup.get(this.formComponent.name) as FormArray).push(this.formBuilder.group(data));
    this.formComponent.children.push({label: 'New item', fields: fields});
  }

}
