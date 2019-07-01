import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {FormArray, FormBuilder, FormGroup} from "@angular/forms";
import {Field} from "./field";
import {FilesService} from "../files/files.service";
import {DomSanitizer} from "@angular/platform-browser";

@Component({
  selector: 'generic-api-resource-files-async',
  template: `
    <div>
      !DEBUG!<br/>
      <app-upload url="http://localhost:3000/upload"></app-upload>
    </div>
  `,
  styleUrls: [],
  providers: [FilesService]
})
export class FilesAsyncComponent extends Field {

  constructor(private formBuilder: FormBuilder, private filesService: FilesService, private sanitizer: DomSanitizer) {
    super();
  }

}

