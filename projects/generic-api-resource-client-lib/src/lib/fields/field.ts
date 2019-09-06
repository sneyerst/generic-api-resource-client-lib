import {FormArray, FormBuilder, FormGroup} from "@angular/forms";
import {Input} from "@angular/core";

export class Field {

  _parentFormGroup: FormGroup;
  _formComponent: any;

  @Input()
  set parentFormGroup(parentFormGroup) {
    this._parentFormGroup = parentFormGroup;
  }

  @Input()
  set formComponent(formComponent) {
    this._formComponent = formComponent;
  }

  get parentFormGroup() {
    return this._parentFormGroup
  }

  get formComponent() {
    return this._formComponent
  }
  getControlsFor(formComponent) {
    return (this.parentFormGroup.get(formComponent) as FormArray).controls;
  }

  getTriggeredClass(formComponent) {
    return formComponent.trigger_class ? formComponent.trigger_class : 'strikethrough';
  }

}
