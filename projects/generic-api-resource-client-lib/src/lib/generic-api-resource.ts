import {Input} from "@angular/core";
import {BehaviorSubject} from "rxjs";

export class GenericApiResource {

  _apiUrlObservable = new BehaviorSubject('http://localhost:3000/api/v1');
  _resourceNameSingular: string;   // This is the only required attribute
  _resourceNamePlural: string;
  _resourceIndexUri: string;
  _resourceShowUri: string;
  _resourceNewUri: string;
  _resourceEditUri: string;
  _apiUri: string;
  _apiIndexUri: string;
  _apiShowUri: string;
  _apiNewUri: string;
  _apiEditUri: string;
  _apiCreateUri: string;
  _apiUpdateUri: string;
  _apiDestroyUri: string;
  _enableIndex: boolean;
  _enableShow: boolean;
  _enableNew: boolean;
  _enableEdit: boolean;
  _enableDestroy: boolean;
  _resourceNamespace: string;
  _apiNamespace: string;
  _showIsEdit: boolean;
  _apiNameSingular: string;
  _apiNamePlural: string;
  _defaultQuery: {};
  _activateSpinner: boolean = false;

  @Input() set apiUrl(apiUrl: string) { this._apiUrlObservable.next(apiUrl); }
  @Input() set resourceNameSingular(resourceNameSingular: string) {
    this._resourceNameSingular = resourceNameSingular;
  }
  @Input() set resourceNamePlural(resourceNamePlural: string) {
    this._resourceNamePlural = resourceNamePlural;
  }
  @Input() set resourceIndexUri(resourceIndexUri: string) {
    this._resourceIndexUri = resourceIndexUri;
  }
  @Input() set resourceShowUri(resourceShowUri: string) {
    this._resourceShowUri = resourceShowUri;
  }
  @Input() set resourceNewUri(resourceNewUri: string) { this._resourceNewUri = resourceNewUri; }
  @Input() set resourceEditUri(resourceEditUri: string) { this._resourceEditUri = resourceEditUri; }
  @Input() set apiIndexUri(apiIndexUri: string) {
    this._apiIndexUri = apiIndexUri;
  }
  @Input() set apiShowUri(apiShowUri: string) {
    this._apiShowUri = apiShowUri;
  }
  @Input() set apiUri(apiUri: string) {
    this._apiUri = apiUri;
  }
  @Input() set apiNewUri(apiNewUri: string) { this._apiNewUri = apiNewUri; }
  @Input() set apiEditUri(apiEditUri: string) { this._apiEditUri = apiEditUri; }
  @Input() set apiCreateUri(apiCreateUri: string) { this._apiCreateUri = apiCreateUri; }
  @Input() set apiUpdateUri(apiUpdateUri: string) { this._apiUpdateUri = apiUpdateUri; }
  @Input() set apiDestroyUri(apiDestroyUri: string) { this._apiDestroyUri = apiDestroyUri; }
  @Input() set enableIndex(enableIndex: boolean) { this._enableIndex = enableIndex; }
  @Input() set enableShow(enableShow: boolean) { this._enableShow = enableShow; }
  @Input() set enableNew(enableNew: boolean) { this._enableNew = enableNew; }
  @Input() set enableEdit(enableEdit: boolean) { this._enableEdit = enableEdit; }
  @Input() set enableDestroy(enableDestroy: boolean) { this._enableDestroy = enableDestroy; }
  @Input() set resourceNamespace(resourceNamespace: string) { this._resourceNamespace = resourceNamespace; }
  @Input() set apiNamespace(apiNamespace: string) { this._apiNamespace = apiNamespace; }
  @Input() set showIsEdit(showIsEdit: boolean) { console.log('DEPRECATION NOTICE: showIsEdit is no longer used'); this._showIsEdit = showIsEdit; }
  @Input() set apiNameSingular(apiNameSingular: string) { this._apiNameSingular = apiNameSingular; }
  @Input() set apiNamePlural(apiNamePlural: string) { this._apiNamePlural = apiNamePlural; }
  @Input()
  set defaultQuery(defaultQuery: {}) {
    this._defaultQuery = defaultQuery;
  }
  set activateSpinner(activateSpinner: boolean) {
    this._activateSpinner = activateSpinner;
  }

  get apiUrlObservable(): BehaviorSubject<string> { return this._apiUrlObservable; }
  get apiUrl(): string { return this._apiUrlObservable.getValue(); }
  get resourceNameSingular(): string { return this._resourceNameSingular; }
  get resourceNamePlural(): string { return this._resourceNamePlural == null ? this._resourceNameSingular + 's' : this._resourceNamePlural; }
  get resourceIndexUri(): string { return this._resourceIndexUri == null ? `${this.resourceNamespace}${this.resourceNamePlural}` : this._resourceIndexUri; }
  get resourceShowUri(): string { return this.showIsEdit ? this.resourceEditUri : (this._resourceShowUri == null ? `${this.resourceNamespace}${this.resourceNamePlural}/:id` : this._resourceShowUri); }
  get resourceNewUri(): string { return this._resourceNewUri == null ? `${this.resourceNamespace}${this.resourceNamePlural}/new` : this._resourceNewUri; }
  get resourceEditUri(): string { return this._resourceEditUri == null ? `${this.resourceNamespace}${this.resourceNamePlural}/:id/edit` : this._resourceEditUri; }
  get apiUri(): string { return this._apiUri == null ? `${this.apiNamePlural}` : this._apiUri; }
  get apiIndexUri(): string { return this._apiIndexUri == null ? `${this.apiNamespace}${this.apiUri}` : this._apiIndexUri; }
  get apiShowUri(): string { return this._apiShowUri == null ? `${this.apiNamespace}${this.apiUri}/:id` : this._apiShowUri; }
  get apiNewUri(): string { return this._apiNewUri == null ? `${this.apiNamespace}${this.apiUri}/new${this.apiNewQueryString}` : this._apiNewUri; }
  get apiEditUri(): string { return this._apiEditUri == null ? `${this.apiNamespace}${this.apiUri}/:id/edit` : this._apiEditUri; }
  get apiCreateUri(): string { return this._apiCreateUri == null ? `${this.apiNamespace}${this.apiUri}` : this._apiCreateUri; }
  get apiUpdateUri(): string { return this._apiUpdateUri == null ? `${this.apiNamespace}${this.apiUri}/:id` : this._apiUpdateUri; }
  get apiDestroyUri(): string { return this._apiDestroyUri == null ? `${this.apiNamespace}${this.apiUri}/:id` : this._apiDestroyUri; }
  get enableIndex(): boolean { return this._enableIndex == null ? true : this._enableIndex; }
  get enableShow(): boolean { return this._enableShow == null ? true : this._enableShow; }
  get enableNew(): boolean { return this._enableNew == null ? true : this._enableNew; }
  get enableEdit(): boolean { return this._enableEdit == null ? true : this._enableEdit; }
  get enableDestroy(): boolean { return this._enableDestroy == null ? true : this._enableDestroy; }
  get resourceNamespace(): string { return this._resourceNamespace == null ? '' : `${this._resourceNamespace}/`; }
  get apiNamespace(): string { return this._apiNamespace == null ? (this.resourceNamespace) : `${this._apiNamespace}/`; }
  get showIsEdit(): boolean { return this._showIsEdit == null ? true : this._showIsEdit; }
  get apiNameSingular(): string { return this._apiNameSingular == null ? this.resourceNameSingular : this._apiNameSingular; }
  get apiNamePlural(): string { return this._apiNamePlural == null ? this.apiNameSingular + 's' : this._apiNamePlural; }
  get defaultQuery(): {} {
    if (this._defaultQuery == null) {
      return {};
    } else {
      return this._defaultQuery;
    }
  }
  get apiNewQueryString(): string {
    let queryString = '';
    if (Object.keys(this.defaultQuery).length > 0) {
      queryString = '?' + Object.keys(this.defaultQuery).map((key) => {
        return key + '=' + this.defaultQuery[key];
      }).join('&');
    }
    return queryString;
  }
  get activateSpinner(): boolean {
    return this._activateSpinner;
  }

}
