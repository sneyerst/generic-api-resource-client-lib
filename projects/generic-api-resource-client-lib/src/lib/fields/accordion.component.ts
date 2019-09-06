import {Component, EventEmitter, Input, OnDestroy, OnInit, Output} from '@angular/core';
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
                      class="{{getTriggeredClass(formComponent.children[i])}}">{{getLabel(formComponent.children[i], item)}}</span>
                <span *ngIf="!formComponent.children[i].trigger || !item.value[formComponent.children[i].trigger]">{{getLabel(formComponent.children[i], item)}}</span>

                          </mat-expansion-panel-header>

                          <ng-container *ngFor="let childComponent of formComponent.children[i].fields">
                              <generic-api-resource-textfield [parentFormGroup]="getControlsFor(formComponent.name)[i]"
                                                              [formComponent]="childComponent"
                                                              *ngIf="childComponent.type == 'textfield'"></generic-api-resource-textfield>
                              <generic-api-resource-markup [formComponent]="childComponent"
                                                           *ngIf="childComponent.type == 'markup'"></generic-api-resource-markup>
                              <generic-api-resource-textarea [parentFormGroup]="getControlsFor(formComponent.name)[i]"
                                                             [formComponent]="childComponent"
                                                             *ngIf="childComponent.type == 'textarea'"></generic-api-resource-textarea>
                              <generic-api-resource-checkbox [parentFormGroup]="getControlsFor(formComponent.name)[i]"
                                                             [formComponent]="childComponent"
                                                             *ngIf="childComponent.type == 'checkbox'"></generic-api-resource-checkbox>
                              <generic-api-resource-dropdown [parentFormGroup]="getControlsFor(formComponent.name)[i]"
                                                             [formComponent]="childComponent"
                                                             *ngIf="childComponent.type == 'dropdown'"></generic-api-resource-dropdown>
                              <generic-api-resource-dropdown_multiselect
                                      [parentFormGroup]="getControlsFor(formComponent.name)[i]"
                                      [formComponent]="childComponent"
                                      *ngIf="childComponent.type == 'dropdown_multiselect'"></generic-api-resource-dropdown_multiselect>
                              <generic-api-resource-files [parentFormGroup]="getControlsFor(formComponent.name)[i]"
                                                          [formComponent]="childComponent"
                                                          *ngIf="childComponent.type == 'files'"></generic-api-resource-files>
                              <generic-api-resource-files-async [uploadUrl]="childComponent.upload_url"
                                                                [parentFormGroup]="getControlsFor(formComponent.name)[i]"
                                                                [formComponent]="childComponent"
                                                                (uploadSucceeded)="uploadSucceeded()"
                                                                *ngIf="childComponent.type == 'files_async'"></generic-api-resource-files-async>
                              <generic-api-resource-passwordfield
                                      [parentFormGroup]="getControlsFor(formComponent.name)[i]"
                                      [formComponent]="childComponent"
                                      *ngIf="childComponent.type == 'passwordfield'"></generic-api-resource-passwordfield>

                              <generic-api-resource-accordion [parentFormGroup]="getControlsFor(formComponent.name)[i]" [formComponent]="childComponent"
                                                              *ngIf="childComponent.type == 'accordion'"></generic-api-resource-accordion>
                              <generic-api-resource-table [parentFormGroup]="getControlsFor(formComponent.name)[i]" [formComponent]="childComponent"
                                                          *ngIf="childComponent.type == 'table'"></generic-api-resource-table>
                              
                              
                          </ng-container>

                      </mat-expansion-panel>
                  </ng-container>
              </ng-container>

          </mat-accordion>

          <button mat-raised-button color="primary" (click)="addChild(formComponent.new, formComponent.fields)"
                  *ngIf="formComponent.new">Add
              item
          </button>

          <button mat-raised-button color="primary" (click)="addFormGroupChild(formComponent)"
                  *ngIf="formComponent.new_form_group && formComponent.new_child">Add
              item
          </button>


      </div>
  `,
  styleUrls: [],
  providers: []
})
export class AccordionComponent extends Field {

  @Output() fileUploaded = new EventEmitter();


  constructor(private formBuilder: FormBuilder) {
    super();
  }

  addChild(data, fields) {
    // TODO: this method has to go in the future
    (this.parentFormGroup.get(this.formComponent.name) as FormArray).push(this.formBuilder.group(data));
    this.formComponent.children.push({label: 'New item', fields: fields});
  }

  addFormGroupChild(formComponent) {
    const newFormGroup = this.formComponent.new_form_group;
    const newChild = this.formComponent.new_child;

    (this.parentFormGroup.get(this.formComponent.name) as FormArray).push(this.parseFormGroup(newFormGroup['value']));
    this.formComponent.children.push(newChild);
  }

  parseFormGroup(formGroupInput) {
    let formGroup = {};
    for (let key of Object.keys(formGroupInput)) {
      switch (formGroupInput[key]['type']) {
        case 'form-control': {
          formGroup[key] = formGroupInput[key]['value'];
          break;
        }
        case 'form-array': {
          formGroup[key] = this.parseFormArray(formGroupInput[key]['value']);
          break;
        }
        case 'form-group': {
          formGroup[key] = this.parseFormGroup(formGroupInput[key]['value']);
          break;
        }
      }
    }
    return this.formBuilder.group(formGroup);
  }

  parseFormArray(formArrayInput) {
    let formArray = [];
    for (let i = 0; i < formArrayInput.length; i++) {
      switch (formArrayInput[i]['type']) {
        case 'form-control': {
          formArray[i] = formArrayInput[i]['value'];
          break;
        }
        case 'form-array': {
          formArray[i] = this.parseFormArray(formArrayInput[i]['value']);
          break;
        }
        case 'form-group': {
          formArray[i] = this.parseFormGroup(formArrayInput[i]['value']);
          break;
        }
      }
    }
    return this.formBuilder.array(formArray);
  }

  debugOutput(obj) {
    console.log(obj);
  }

  uploadSucceeded() {
    this.fileUploaded.emit();
  }

}
