import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {FormArray, FormBuilder, FormGroup} from "@angular/forms";
import {Field} from "./field";

@Component({
  selector: 'generic-api-resource-file',
  template: ` 
    
      <input type="file" id="{{parentFormGroup.value.id}}_{{formComponent.name}}_uploader"
             (change)="onFileChange($event)">
  `,
  styleUrls: [],
  providers: []
})
export class FileComponent extends Field {

  constructor(private formBuilder: FormBuilder) {
    super();
  }

  onFileChange(event) {
    try {
      let tooLargeFiles: string[] = [];
      const file = event.target.files[0];

      let reader = new FileReader();
      if (file.size <= 8000000) {
        reader.readAsDataURL(file);
        reader.onload = () => {
          this.parentFormGroup.patchValue(JSON.parse(`{"${this.formComponent.name}": "${reader.result}"}`));
        }
      } else {
        tooLargeFiles.push(file.name);
      }

      if (tooLargeFiles.length > 0) {
        alert('One or more files are too large and won\'t be uploaded: ' + tooLargeFiles.join(', '));
      }
    } catch (e) {
      alert("Uploading didn't work. Error message: " + e);
    }

  }

  initiateFileSelection(name) {
    document.getElementById(name).click();
  }

}

