import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {FormGroup} from "@angular/forms";
import {Field} from "./field";

@Component({
  selector: 'generic-api-resource-markup',
  template: `
   {{formComponent.markup}}
  `,
  styleUrls: [],
  providers: []
})
export class MarkupComponent extends Field {

}
