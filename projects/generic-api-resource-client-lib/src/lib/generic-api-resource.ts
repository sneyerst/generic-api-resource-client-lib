import {Input} from "@angular/core";
import {BehaviorSubject} from "rxjs";

export class GenericApiResource {

  _apiUrlObservable = new BehaviorSubject('http://localhost:3000/api/v1');
  _resourceNameSingular: string;   // This is the only required attribute
  _resourceNamePlural: string;
  _resourceIndexUri: string;
  _resourceShowUri: string;
  _resourceNewUri: string;
  _resourceCreateUri: string;
  _resourceEditUri: string;
  _resourceUpdateUri: string;
  _resourceDestroyUri: string;
  _enableIndex: boolean;
  _enableShow: boolean;
  _enableNew: boolean;
  _enableEdit: boolean;
  _enableDestroy: boolean;
  _namespace: string;

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
  @Input() set resourceCreateUri(resourceCreateUri: string) { this._resourceCreateUri = resourceCreateUri; }
  @Input() set resourceEditUri(resourceEditUri: string) { this._resourceEditUri = resourceEditUri; }
  @Input() set resourceUpdateUri(resourceUpdateUri: string) { this._resourceUpdateUri = resourceUpdateUri; }
  @Input() set resourceDestroyUri(resourceDestroyUri: string) { this._resourceDestroyUri = resourceDestroyUri; }
  @Input() set enableIndex(enableIndex: boolean) { this._enableIndex = enableIndex; }
  @Input() set enableShow(enableShow: boolean) { this._enableShow = enableShow; }
  @Input() set enableNew(enableNew: boolean) { this._enableNew = enableNew; }
  @Input() set enableEdit(enableEdit: boolean) { this._enableEdit = enableEdit; }
  @Input() set enableDestroy(enableDestroy: boolean) { this._enableDestroy = enableDestroy; }
  @Input() set namespace(namespace: string) { this._namespace = namespace; }

  get apiUrlObservable(): BehaviorSubject<string> { return this._apiUrlObservable; }
  get apiUrl(): string { return this._apiUrlObservable.getValue(); }
  get resourceNameSingular(): string { return this._resourceNameSingular; }
  get resourceNamePlural(): string { return this._resourceNamePlural == null ? this._resourceNameSingular + 's' : this._resourceNamePlural; }
  get resourceIndexUri(): string { return this._resourceIndexUri == null ? `${this.namespace}${this.resourceNamePlural}` : this._resourceIndexUri; }
  get resourceShowUri(): string { return this._resourceShowUri == null ? `${this.namespace}${this.resourceNamePlural}/:id` : this._resourceShowUri; }
  get resourceNewUri(): string { return this._resourceNewUri == null ? `${this.namespace}${this.resourceNamePlural}/new` : this._resourceNewUri; }
  get resourceCreateUri(): string { return this._resourceCreateUri == null ? `${this.namespace}${this.resourceNamePlural}` : this._resourceCreateUri; }
  get resourceEditUri(): string { return this._resourceEditUri == null ? `${this.namespace}${this.resourceNamePlural}/edit` : this._resourceEditUri; }
  get resourceUpdateUri(): string { return this._resourceUpdateUri == null ? `${this.namespace}${this.resourceNamePlural}/:id` : this._resourceUpdateUri; }
  get resourceDestroyUri(): string { return this._resourceDestroyUri == null ? `${this.namespace}${this.resourceNamePlural}/:id` : this._resourceDestroyUri; }
  get enableIndex(): boolean { return this._enableIndex == null ? true : this._enableIndex; }
  get enableShow(): boolean { return this._enableShow == null ? true : this._enableShow; }
  get enableNew(): boolean { return this._enableNew == null ? true : this._enableNew; }
  get enableEdit(): boolean { return this._enableEdit == null ? true : this._enableEdit; }
  get enableDestroy(): boolean { return this._enableDestroy == null ? true : this._enableDestroy; }
  get namespace(): string { return this._namespace == null ? '/' : `/${this._namespace}/`; }

}
