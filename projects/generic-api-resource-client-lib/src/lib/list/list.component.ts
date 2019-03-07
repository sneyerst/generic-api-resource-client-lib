import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {AngularTokenService} from "angular-token";
import {DomSanitizer} from "@angular/platform-browser";
import {ActivatedRoute, Router} from "@angular/router";
import {Subscription} from "rxjs";
import {FormBuilder, FormGroup} from "@angular/forms";
import {ListService} from "./list.service";

@Component({
  selector: 'generic-api-resource-list',
  templateUrl: 'list.component.html',
  styleUrls: [],
  providers: [ListService]
})
export class ListComponent implements OnInit, OnDestroy {

  private _resourceNameSingular: string;
  private _resourceNamePlural: string;
  private _apiEndpointUri: string;
  private _resourceNewUri: string;
  private _defaultQuery: {};
  private _pageTitle: string;
  private _displayTitle: boolean = false;
  private _enableFilters: boolean = false;
  private _enableDetail: boolean = true;

  private _resources: any[];
  private _resourcesSubscription: Subscription;
  private _displayedColumns: string[];
  private _resourceDetailUri: string;

  private _filters;
  private _filtersFormGroup: FormGroup;
  private _filtersFormComponents: any[];
  private _filtersSubscription: Subscription;

  constructor(private apiListService: ListService, private router: Router, private sanitizer: DomSanitizer, private formBuilder: FormBuilder) {
  }

  ngOnInit(): void {
    this._resourcesSubscription = this.apiListService.resourcesObservable.subscribe((resources: any[]) => this._resources = resources);
    this._filtersSubscription = this.apiListService.filtersObservable.subscribe((filters) => {
        this._filters = filters;
        this._filtersFormGroup = this.formBuilder.group(Object.keys(filters).reduce((acc, value) => {
          if (this.displayedColumns.indexOf(value) !== -1) {
            acc[value] = this._filters[value]['value'];
          }
          return acc;
        }, {}));
        this._filtersFormComponents = Object.keys(filters).reduce((acc, value) => {
          if (this.displayedColumns.indexOf(value) !== -1) {
            acc.push({
              name: value,
              label: this._filters[value]['label'],
              type: this._filters[value]['type'],
              initial_value: this._filters[value]['initial_value']
            });
          }
          return acc;
        }, []);
      }
    );
    this.apiListService.setApiEndpoint(this.apiEndpointUri, this.defaultQuery);
  }

  ngOnDestroy(): void {
    this._resourcesSubscription.unsubscribe();
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
  set defaultQuery(defaultQuery: {}) {
    this._defaultQuery = defaultQuery;
  }

  @Input()
  set displayedColumns(displayedColumns: string[]) {
    this._displayedColumns = displayedColumns;
  }

  @Input()
  set resourceDetailUri(resourceDetailUri: string) {
    this._resourceDetailUri = resourceDetailUri;
  }

  @Input()
  set displayTitle(displayTitle: boolean) {
    this._displayTitle = displayTitle;
  }

  @Input()
  set enableFilters(enableFilters: boolean) {
    this._enableFilters = enableFilters;
  }

  @Input()
  set enableDetail(enableDetail: boolean) {
    this._enableDetail = enableDetail;
  }

  @Input()
  set resourceNewUri(resourceNewUri) {
    this._resourceNewUri = resourceNewUri;
    console.log('set');
  }

  get resourceNewUri() {
    if (this._resourceNewUri == null) {
      return '/' + this.resourceNamePlural + '/new';
    } else {
      return this._resourceNewUri;
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
      return `/${this.resourceNamePlural}`;
    } else {
      return this._apiEndpointUri;
    }
  }

  get defaultQuery(): {} {
    if (this._defaultQuery == null) {
      return {};
    } else {
      return this._defaultQuery;
    }
  }

  get resources(): any[] {
    return this._resources;
  }

  get pageTitle(): string {
    if (this._pageTitle == null) {
      return this.pageTitle = this.resourceNamePlural.charAt(0).toUpperCase() + this.resourceNamePlural.slice(1);
    } else {
      return this._pageTitle;
    }
  }

  get displayedColumns(): string[] {
    if (this._displayedColumns == null) {
      if (this.resources && this.resources.length > 0) {
        return Object.keys(this.resources[0]);
      } else {
        return [];
      }
    } else {
      return this._displayedColumns;
    }
  }

  get resourceDetailUri(): string {
    if (this._resourceDetailUri == null) {
      return `/${this.resourceNamePlural}/:id`;
    } else {
      return this._resourceDetailUri;
    }
  }

  get displayTitle() {
    return this._displayTitle;
  }

  resourceClicked(resource: any) {
    this.router.navigateByUrl(this.resourceDetailUri.replace(':id', resource.id));
  }

  loadResources() {
    console.log(this._filtersFormGroup['value']);
    this.apiListService.getResources(this._filtersFormGroup['value']);
  }

  resetFilters() {
    this._filtersFormComponents.forEach((c) => {
      this._filtersFormGroup.patchValue(JSON.parse(`{
       "${c.name}": "${c.initial_value}"
     }`));
    });
    this.loadResources();
  }

  filterKeyup(event) {
    if (event.code === 'Enter' || event.code === 'NumpadEnter') {
      this.loadResources();
    }
  }

  newResource() {
    this.router.navigateByUrl(this.resourceNewUri);
  }

}
