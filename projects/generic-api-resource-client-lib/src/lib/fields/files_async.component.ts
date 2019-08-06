import {Component, EventEmitter, Input, OnDestroy, OnInit, Output} from '@angular/core';
import {FormArray, FormBuilder, FormGroup} from "@angular/forms";
import {Field} from "./field";
import {FilesService} from "../files/files.service";
import {DomSanitizer} from "@angular/platform-browser";

@Component({
  selector: 'generic-api-resource-files-async',
  template: `
    <div [formGroup]="parentFormGroup">
      
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
      
      <app-upload [url]="uploadUrl" [multiple]="true" url="http://localhost:3000/upload" (uploadSucceeded)="emitUploadSuccessful()"></app-upload>
    </div>
  `,
  styleUrls: [],
  providers: [FilesService]
})
export class FilesAsyncComponent extends Field {

  downloadURL;
  clickedElement;

  @Input()
  uploadUrl: string = 'http://localhost:3000';

  @Output() uploadSucceeded = new EventEmitter();


  constructor(private formBuilder: FormBuilder, private filesService: FilesService, private sanitizer: DomSanitizer) {
    super();
  }

  downloadFile(url, item_id) {
    this.filesService.download(url).subscribe((data: any) => {

      this.downloadURL = this.sanitizer.bypassSecurityTrustResourceUrl(window.URL.createObjectURL(data));

      console.log(this.downloadURL);
      let element: HTMLElement = document.getElementById('downloadLink-' + item_id) as HTMLElement;

      element.removeAttribute('style');
      //setTimeout("this.clickedElement.click();", 1000);
      //element.click();
    });
  }

  emitUploadSuccessful() {
    this.uploadSucceeded.emit();
  }

}

