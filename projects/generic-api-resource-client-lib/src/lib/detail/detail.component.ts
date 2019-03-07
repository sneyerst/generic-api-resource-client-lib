import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from "rxjs";
import {Router} from "@angular/router";
import {DomSanitizer} from "@angular/platform-browser";
import {FormBuilder} from "@angular/forms";
import {DetailService} from "./detail.service";

@Component({
  selector: 'generic-api-resource-detail',
  templateUrl: 'detail.component.html',
  styleUrls: [],
  providers: [DetailService]
})
export class DetailComponent {

  _resourceId: number;
  _resourceNameSingular: string;
  _resourceNamePlural: string;
  _apiEndpointUri: string;
  _pageTitle: string;
  _displayedFields: string[];
  _displayTitle: boolean = false;
  _resourceEditUri: string;

  _resource: any;
  _fields: any;
  _resourceSubscription: Subscription;
  _fieldsSubscription: Subscription;
  _resourcesListUri: string;

  constructor(private apiDetailService: DetailService, private router: Router, private sanitizer: DomSanitizer, private formBuilder: FormBuilder) {
  }

  ngOnInit(): void {
    this._resourceSubscription = this.apiDetailService.resourceObservable.subscribe((resource: any) => this._resource = resource);
    this._fieldsSubscription = this.apiDetailService.fieldsObservable.subscribe((fields: any) => this._fields = Object.keys(fields));
    this.apiDetailService.setApiEndpoint(this.apiEndpointUri);
  }

  ngOnDestroy(): void {
    this._resourceSubscription.unsubscribe();
    this._fieldsSubscription.unsubscribe();
  }

  @Input()
  set resourceId(resourceId: number) {
    this._resourceId = resourceId;
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

  @Input()
  set displayedFields(displayedFields: string[]) {
    this._displayedFields = displayedFields;
  }

  @Input()
  set resourceEditUri(resourceEditUri: string) {
    this._resourceEditUri = resourceEditUri;
  }

  get resourceEditUri() {
    if(this._resourceEditUri == null) {
      return `/${this.resourceNamePlural}/${this._resourceId}/edit`;
    } else {
      return this._resourceEditUri.replace(':id', ('' + this._resourceId));
    }
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
    if (this._apiEndpointUri == null) {
      return `/${this.resourceNamePlural}/${this._resourceId}`;
    } else {
      return this._apiEndpointUri.replace(':id', ('' + this._resourceId));
    }
  }

  get pageTitle(): string {
    if (this._pageTitle == null) {
      return this.pageTitle = this.resourceNameSingular.charAt(0).toUpperCase() + this.resourceNameSingular.slice(1) + ' #' + this._resourceId;
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

  get displayedFields(): string[] {
    return this._displayedFields;
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

  editButtonClicked() {
    this.router.navigateByUrl(this.resourceEditUri);
  }

}
