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
  _namespace: string;
  _showIsEdit: boolean;

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
  @Input() set namespace(namespace: string) { this._namespace = namespace; }
  @Input() set showIsEdit(showIsEdit: boolean) { this._showIsEdit = showIsEdit; }

  get apiUrlObservable(): BehaviorSubject<string> { return this._apiUrlObservable; }
  get apiUrl(): string { return this._apiUrlObservable.getValue(); }
  get resourceNameSingular(): string { return this._resourceNameSingular; }
  get resourceNamePlural(): string { return this._resourceNamePlural == null ? this._resourceNameSingular + 's' : this._resourceNamePlural; }
  get resourceIndexUri(): string { return this._resourceIndexUri == null ? `${this.namespace}${this.resourceNamePlural}` : this._resourceIndexUri; }
  get resourceShowUri(): string { return this.showIsEdit ? this.resourceEditUri : (this._resourceShowUri == null ? `${this.namespace}${this.resourceNamePlural}/:id` : this._resourceShowUri); }
  get resourceNewUri(): string { return this._resourceNewUri == null ? `${this.namespace}${this.resourceNamePlural}/new` : this._resourceNewUri; }
  get resourceEditUri(): string { return this._resourceEditUri == null ? `${this.namespace}${this.resourceNamePlural}/:id/edit` : this._resourceEditUri; }
  get apiIndexUri(): string { return this._apiIndexUri == null ? `/${this.resourceNamePlural}` : this._apiIndexUri; }
  get apiShowUri(): string { return this.showIsEdit ? this.apiEditUri : (this._apiShowUri == null ? `/${this.resourceNamePlural}/:id` : this._apiShowUri); }
  get apiNewUri(): string { return this._apiNewUri == null ? `/${this.resourceNamePlural}/new` : this._apiNewUri; }
  get apiEditUri(): string { return this._apiEditUri == null ? `/${this.resourceNamePlural}/:id/edit` : this._apiEditUri; }
  get apiCreateUri(): string { return this._apiCreateUri == null ? `/${this.resourceNamePlural}` : this._apiCreateUri; }
  get apiUpdateUri(): string { return this._apiUpdateUri == null ? `/${this.resourceNamePlural}/:id` : this._apiUpdateUri; }
  get apiDestroyUri(): string { return this._apiDestroyUri == null ? `/${this.resourceNamePlural}/:id` : this._apiDestroyUri; }
  get enableIndex(): boolean { return this._enableIndex == null ? true : this._enableIndex; }
  get enableShow(): boolean { return this._enableShow == null ? true : this._enableShow; }
  get enableNew(): boolean { return this._enableNew == null ? true : this._enableNew; }
  get enableEdit(): boolean { return this._enableEdit == null ? true : this._enableEdit; }
  get enableDestroy(): boolean { return this._enableDestroy == null ? true : this._enableDestroy; }
  get namespace(): string { return this._namespace == null ? '/' : `/${this._namespace}/`; }
  get showIsEdit(): boolean { return this._showIsEdit == null ? true : this._showIsEdit; }

}
