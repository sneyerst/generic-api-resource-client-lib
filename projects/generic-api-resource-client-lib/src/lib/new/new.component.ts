import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from "rxjs";
import {Router} from "@angular/router";
import {DomSanitizer} from "@angular/platform-browser";
import {FormBuilder, FormGroup} from "@angular/forms";
import {MatSnackBar} from "@angular/material";
import {ListService} from "../list/list.service";
import {DetailService} from "../detail/detail.service";


@Component({
  selector: 'generic-api-resource-new',
  templateUrl: 'new.component.html',
  styleUrls: [],
  providers: [DetailService, ListService]
})
export class NewComponent {

  _resourceNameSingular: string;
  _resourceNamePlural: string;
  _apiEndpointUri: string;
  _pageTitle: string;
  _displayedFields: string[];
  _displayTitle: boolean = false;
  _resourcesListUri: string;

  _resourceFormGroup: FormGroup;
  _resourceFormComponents: any[];

  _fieldsSubscription: Subscription;
  _fields: any;
  _resourceSubscription: Subscription;
  _resource: any;

  constructor(private apiDetailService: DetailService, private apiListService: ListService, private router: Router, private sanitizer: DomSanitizer, private formBuilder: FormBuilder, private snackBar: MatSnackBar) {
  }

  ngOnInit(): void {
    this._resourceSubscription = this.apiDetailService.resourceObservable.subscribe((resource: any) => this._resource = resource);
    this._fieldsSubscription = this.apiDetailService.fieldsObservable.subscribe((fields: any) => {
      this._fields = fields;
      this._resourceFormGroup = this.formBuilder.group(Object.keys(fields).reduce((acc, value) => {
        acc[value] = fields[value]['value'];
        return acc;
      }, {}));
      this._resourceFormComponents = Object.keys(fields).reduce((acc, value) => {
        acc.push({
          name: value,
          label: fields[value]['label'],
          type: fields[value]['type'],
          options: fields[value]['options'],
          file_present: fields[value]['file_present']
        });
        return acc;
      }, []);
    });
    this.apiDetailService.setApiEndpoint(this.apiEndpointUri + '/new');
    this.apiListService.setApiEndpoint('', this.apiEndpointUri, {});
  }

  ngOnDestroy(): void {
    this._resourceSubscription.unsubscribe();
    this._fieldsSubscription.unsubscribe();
  }

  @Input()
  set resourceNameSingular(resourceNameSingular: string) {
    this._resourceNameSingular = resourceNameSingular;
  }

  @Input()
  set resourceNamePlural(resourceNamePlural: string) {
    this._resourceNamePlural = resourceNamePlural;
  }

  @Input()
  set pageTitle(pageTitle: string) {
    this._pageTitle = pageTitle;
  }

  @Input()
  set apiEndpointUri(apiEndpointUri: string) {
    this._apiEndpointUri = apiEndpointUri;
  }

  @Input()
  set resourcesListUri(resourcesListUri: string) {
    this._resourcesListUri = resourcesListUri;
  }

  @Input()
  set displayTitle(displayTitle: boolean) {
    this._displayTitle = displayTitle;
  }

  get resourceNameSingular(): string {
    return this._resourceNameSingular;
  }

  get resourceNamePlural(): string {
    if (this._resourceNamePlural == null) {
      return this._resourceNameSingular + 's';
    } else {
      return this._resourceNamePlural;
    }
  }

  get apiEndpointUri(): string {
    return `/${this.resourceNamePlural}`;
  }

  get pageTitle(): string {
    if (this._pageTitle == null) {
      return this.pageTitle = 'Create a new ' + this.resourceNameSingular.charAt(0).toUpperCase() + this.resourceNameSingular.slice(1);
    } else {
      return this._pageTitle;
    }
  }

  get resourcesListUri(): string {
    if (this._resourcesListUri == null) {
      return `/${this.resourceNamePlural}`;
    } else {
      return this._resourcesListUri;
    }
  }

  get fields(): string[] {
    if (this._displayedFields == null) {
      if (this._fields == null) {
        return ['id'];
      } else {
        return this._fields;
      }
    } else {
      return this._displayedFields;
    }
  }

  get resource() {
    return this._resource;
  }

  get displayTitle() {
    return this._displayTitle;
  }

  getResourceAttributes() {
    return JSON.parse(`{"${this.resourceNameSingular}":${JSON.stringify(this._resourceFormGroup['value'])}}`);
  }


  cancelButtonClicked() {
    this.router.navigateByUrl(this.resourcesListUri);
  }

  showSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {duration: 2500});
  }

  createResource() {
    this.apiListService.createResource(this.getResourceAttributes()).then(
      (response) => {
        this.router.navigateByUrl(this.resourcesListUri);
        this.showSnackBar("Object has been created.", 'Ok');
      },
      (response) => {
        switch (response.status) {
          case 403: {
            this.showSnackBar("You do not have permission for this action.", 'Ok');
            break;
          }
          case 422: {
            this.showSnackBar("Couldn't save because of validation errors.", 'Ok');
            break;
          }
          default: {
            this.showSnackBar("An error occured. Couldn't save.", 'Ok');
            break;
          }
        }
      }
    );
  }

}
