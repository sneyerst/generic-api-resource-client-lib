import {Component, EventEmitter, Input, OnDestroy, OnInit, Output} from '@angular/core';
import {FormArray, FormBuilder, FormGroup} from "@angular/forms";
import {Field} from "./field";
import {FilesService} from "../files/files.service";
import {DomSanitizer} from "@angular/platform-browser";

@Component({
  selector: 'generic-api-resource-files-async',
  template: `
    <div [formGroup]="parentFormGroup">
        <h3 *ngIf="formComponent.label">{{formComponent.label}}}</h3>

        <ul class="file-list" formArrayName="{{formComponent.name}}"
          *ngFor="let item of getControlsFor(formComponent.name); let i = index;">
        <li [formGroupName]="i">
          <mat-form-field class="file-label">
            <mat-label>Label</mat-label>
            <input matInput formControlName="label">
          </mat-form-field>
          &nbsp;
          <ng-container *ngIf="item['value']['id']">
            <button mat-raised-button (click)="downloadFile(formComponent['url'].replace(':id', item['value']['id']), item['value']['label'])">Download</button>&nbsp;
            <mat-checkbox class="file-destroy" formControlName="_destroy">Delete</mat-checkbox>
          </ng-container>

        </li>
      </ul>
      
      <app-upload [url]="uploadUrl" [multiple]="true" (uploadSucceeded)="emitUploadSuccessful()"></app-upload>
    </div>
  `,
  styleUrls: [],
  providers: [FilesService]
})
export class FilesAsyncComponent extends Field {

  @Input()
  uploadUrl: string = 'http://localhost:3000';

  @Output() uploadSucceeded = new EventEmitter();


  constructor(private formBuilder: FormBuilder, private filesService: FilesService, private sanitizer: DomSanitizer) {
    super();
  }

  downloadFile(url, filename) {
    this.filesService.download(url).subscribe((data: any) => {
      // It is necessary to create a new blob object with mime-type explicitly set
      // otherwise only Chrome works like it should

      const blob = new Blob([(data)], { type: 'application/octet-stream' });

      // IE doesn't allow using a blob object directly as link href
      // instead it is necessary to use msSaveOrOpenBlob
      if (window.navigator && window.navigator.msSaveOrOpenBlob) {
        window.navigator.msSaveOrOpenBlob(blob);
        return;
      }

      // For other browsers:
      // Create a link pointing to the ObjectURL containing the blob.
      // const downloadURL = URL.createObjectURL(newBlob);
      // window.open(downloadURL);

      const downloadURL = window.URL.createObjectURL(blob);
      let link = document.createElement('a');
      link.href = downloadURL;
      link.download = filename;
      document.body.appendChild(link);
      link.click();
      setTimeout(function(){
        document.body.removeChild(link);
        window.URL.revokeObjectURL(downloadURL);
      }, 100);

    });
  }

  emitUploadSuccessful() {
    this.uploadSucceeded.emit();
  }

}

