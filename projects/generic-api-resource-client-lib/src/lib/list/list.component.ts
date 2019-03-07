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

  _resourceNameSingular: string;
  _resourceNamePlural: string;

  _apiUrl;
  _defaultQuery: {};

  _resourceIndexUri: string;
  _resourceNewUri: string;
  _resourceShowUri: string;

  _pageTitle: string;
  _displayTitle: boolean = false;
  _enableFilters: boolean = false;

  _enableDetail: boolean = true;
  _resources: any[];
  _resourcesSubscription: Subscription;
  _displayedColumns: string[];

  _filters;
  _filtersFormGroup: FormGroup;
  _filtersFormComponents: any[];
  _filtersSubscription: Subscription;

  constructor(private apiListService: ListService, private router: Router, private sanitizer: DomSanitizer, private formBuilder: FormBuilder) {
    this.apiListService.url = this.apiUrl;
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
    this.apiListService.setApiEndpoint(this.resourceIndexUri, this.defaultQuery);
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
  set resourceIndexUri(resourceIndexUri: string) {
    this._resourceIndexUri = resourceIndexUri;
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
  set resourceShowUri(resourceShowUri: string) {
    this._resourceShowUri = resourceShowUri;
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

  @Input()
  set apiUrl(apiUrl) {
    this._apiUrl = apiUrl;
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

  get resourceIndexUri(): string {
    if (this._resourceIndexUri == null) {
      return `/${this.resourceNamePlural}`;
    } else {
      return this._resourceIndexUri;
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

  get resourceShowUri(): string {
    if (this._resourceShowUri == null) {
      return `/${this.resourceNamePlural}/:id`;
    } else {
      return this._resourceShowUri;
    }
  }

  get displayTitle() {
    return this._displayTitle;
  }

  get apiUrl() {
    if (this._apiUrl == null) {
      return `http://loclahost:3000`;
    } else {
      return this._apiUrl;
    }
  }

  resourceClicked(resource: any) {
    this.router.navigateByUrl(this.resourceShowUri.replace(':id', resource.id));
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
