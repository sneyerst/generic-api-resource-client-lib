import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {Form, FormArray, FormBuilder, FormGroup} from "@angular/forms";
import {Field} from "./field";

@Component({
  selector: 'generic-api-resource-accordion',
  template: `
    <div [formGroup]="parentFormGroup">
      <h2>{{formComponent.label}}</h2>
      <mat-accordion>

        <ng-container formArrayName="{{formComponent.name}}"
                      *ngFor="let item of getControlsFor(formComponent.name); let i = index;">
          <ng-container [formGroupName]="i">
            <mat-expansion-panel>
              <mat-expansion-panel-header>
                <span *ngIf="formComponent.children[i].trigger && item.value[formComponent.children[i].trigger]"
                      style="text-decoration: line-through">{{formComponent.children[i].label}}</span>
                <span
                  *ngIf="!formComponent.children[i].trigger || !item.value[formComponent.children[i].trigger]">{{formComponent.children[i].label}}</span>

              </mat-expansion-panel-header>

              <ng-container *ngFor="let childComponent of formComponent.children[i].fields">

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

              </ng-container>

            </mat-expansion-panel>
          </ng-container>
        </ng-container>

      </mat-accordion>

      <button mat-raised-button color="primary" (click)="addChild(formComponent.new)" *ngIf="formComponent.new">Add
        item
      </button>


    </div>
  `,
  styleUrls: [],
  providers: []
})
export class AccordionComponent extends Field {

  constructor(private formBuilder: FormBuilder) {
    super();
  }

  addChild(data) {
    console.log('addChild()');
    (this.parentFormGroup.get(this.formComponent.name) as FormArray).push(this.formBuilder.group(data));
    this.formComponent.children.push({label: 'New item', fields: [this.formComponent]});
    console.log('this.parentFormGroup');
    console.log(this.parentFormGroup);
    console.log('this.formComponent');
    console.log(this.formComponent);
  }

}
