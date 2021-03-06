import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import {forkJoin} from "rxjs";
import {UploadService} from "../upload.service";
import {Component, EventEmitter, Inject, Output, ViewChild} from "@angular/core";

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css'],
})
export class DialogComponent {

  @Output() uploadSucceeded = new EventEmitter();

  progress;
  canBeClosed = true;
  primaryButtonText = 'Upload';
  showCancelButton = true;
  uploading = false;
  uploadSuccessful = false;
  url: string;
  multiple: boolean;
  comments= [];
  commentsSubscriptions = [];

  constructor(public dialogRef: MatDialogRef<DialogComponent>, public uploadService: UploadService, @Inject(MAT_DIALOG_DATA) public data: any) {
    this.url = data.url;
    this.multiple = data.multiple;
  }

  @ViewChild('file', { static: false }) file;
  public files: Set<File> = new Set();

  addFiles() {
    this.file.nativeElement.click();
  }

  onFilesAdded() {
    const files: { [key: string]: File } = this.file.nativeElement.files;
    if(!this.multiple) {
      this.files.clear();
    }
    for (let key in files) {
      if (!isNaN(parseInt(key))) {
        this.files.add(files[key]);
      }
    }
  }

  closeDialog() {
    // if everything was uploaded already, just close the dialog
    if (this.uploadSuccessful) {
      console.log('emitting 1');
      this.uploadSucceeded.emit();
      return this.dialogRef.close();
    }

    // set the component state to "uploading"
    this.uploading = true;
    this.comments = [];

    // start the upload and save the progress map
    this.progress = this.uploadService.upload(this.files, this.url);

    // convert the progress map into an array
    let allProgressObservables = [];
    for (let key in this.progress) {
      allProgressObservables.push(this.progress[key].progress);
      this.commentsSubscriptions.push(this.progress[key].comments.subscribe((comments) => {
        for (let comment of comments) {
          this.comments.push(comment);
        }
      }));
    }

    // Adjust the state variables

    // The OK-button should have the text "Finish" now
    this.primaryButtonText = 'Finish';

    // The dialog should not be closed while uploading
    this.canBeClosed = false;
    this.dialogRef.disableClose = true;

    // Hide the cancel-button
    this.showCancelButton = false;

    // When all progress-observables are completed...
    forkJoin(allProgressObservables).subscribe(end => {
      // ... the dialog can be closed again...
      this.canBeClosed = true;
      this.dialogRef.disableClose = false;

      // ... the upload was successful...
      this.uploadSuccessful = true;

      // ... and the component is no longer uploading
      this.uploading = false;

      for(let subscr of this.commentsSubscriptions) {
        subscr.unsubscribe();
      }
    });

  }

}
