import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {FormArray, FormBuilder, FormGroup} from "@angular/forms";
import {Field} from "./field";
import {FilesService} from "../files/files.service";
import {DomSanitizer} from "@angular/platform-browser";

@Component({
  selector: 'generic-api-resource-files',
  template: `
    <div [formGroup]="parentFormGroup">
      <h3>Files</h3>
      
      <ul class="file-list" formArrayName="{{formComponent.name}}"
          *ngFor="let item of getControlsFor(formComponent.name); let i = index;">
        <li [formGroupName]="i">
          <mat-form-field class="file-label">
            <mat-label>Label</mat-label>
            <input matInput formControlName="label">
          </mat-form-field>
          &nbsp;
          <ng-container *ngIf="item['value']['id']">
            <button mat-raised-button (click)="downloadFile(formComponent['url'].replace(':id', item['value']['id']), item['value']['id'])">Download</button>&nbsp;
            <a target="_blank" id="{{'downloadLink-' + item['value']['id']}}" [href]="downloadURL" style="display: none;">Hidden download link</a>
      
            <mat-checkbox class="file-destroy" formControlName="_destroy">Delete</mat-checkbox>
          </ng-container>

        </li>
      </ul>
      <p *ngIf="getControlsFor(formComponent.name).length == 0">No uploads yet.</p>

      <input type="file" id="{{parentFormGroup.value.id}}_{{formComponent.name}}_uploader"
             (change)="onFileChange($event, formComponent.name)" multiple [hidden]="true">

      <button mat-raised-button color="primary"
              (click)="initiateFileSelection(parentFormGroup.value.id + '_' + formComponent.name + '_uploader')">Select
        files for upload
      </button>
      &nbsp;
      <span style="color: #ccc;">Max. 8MB per file.</span>

    </div>
  `,
  styleUrls: [],
  providers: [FilesService]
})
export class FilesComponent extends Field {

  downloadURL;

  constructor(private formBuilder: FormBuilder, private filesService: FilesService, private sanitizer: DomSanitizer) {
    super();
  }

  onFileChange(event, collection_name: string) {
    let collection = this.parentFormGroup.get(collection_name) as FormArray;
    try {
      let tooLargeFiles: string[] = [];
      for (let file of event.target.files) {
        let reader = new FileReader();
        console.log(file.size);
        if (file.size <= 8000000) {
          let fileGroup = {};
          reader.readAsDataURL(file);

          reader.onload = () => {
            fileGroup['label'] = file.name;
            fileGroup['attachment'] = reader.result;
            collection.push(this.formBuilder.group(fileGroup));
          }
        } else {
          tooLargeFiles.push(file.name);
        }
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

  downloadFile(url, item_id) {
    this.filesService.download(url).subscribe((data: any) => {

      this.downloadURL = this.sanitizer.bypassSecurityTrustResourceUrl(window.URL.createObjectURL(data));

      console.log(this.downloadURL);
      let element: HTMLElement = document.getElementById('downloadLink-' + item_id) as HTMLElement;
      element.removeAttribute('style');
      //element.click();

    });
  }

  debugOutput(obj) {
    console.log(obj);
  }

}

