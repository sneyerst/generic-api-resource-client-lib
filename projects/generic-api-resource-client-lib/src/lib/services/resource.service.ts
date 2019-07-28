import {Injectable} from "@angular/core";
import {BehaviorSubject} from "rxjs";
import {Router} from "@angular/router";
import {HttpClient} from "@angular/common/http";

@Injectable()
export class ResourceService {

  private _url: string;
  private _apiIndexUri: string;
  private _apiResourceUri: string;
  private _defaultQuery: any = {};

  constructor(private http: HttpClient) {
  }

  setApiEndpoint(url: string, apiIndexUri: string, apiResourceUri: string = null) {
    this._url = url;
    this._apiIndexUri = apiIndexUri;
    this._apiResourceUri = apiResourceUri;
  }

  setDefaultQuery(defaultQuery: any = {}) {
    this._defaultQuery = defaultQuery;
  }

  getResources(query: any = {}) {
    const queryString = this.getQueryString(query);
    return this.http.get(this.getIndexUrl(queryString)).toPromise();
  }

  getResource() {
    return this.http.get(this.getResourceUrl()).toPromise();
  }

  createResource(resourceAttributes: any) {
    return this.http.post(this.getIndexUrl(), resourceAttributes).toPromise();
  }

  updateResource(resourceAttributes: any) {
    return this.http.patch(this.getResourceUrl(), resourceAttributes).toPromise();
  }

  deleteResource() {
    return this.http.delete(this.getResourceUrl()).toPromise();
  }

  getIndexUrl(queryString = null) {
    if (queryString) {
      return `${this._url}/${this._apiIndexUri}?${queryString}`;
    } else {
      return `${this._url}/${this._apiIndexUri}`;
    }
  }

  getResourceUrl() {
    if (this._apiResourceUri == null) {
      console.log('ERROR: apiResourceUri not set');
    } else {
      return `${this._url}/${this._apiResourceUri}`;
    }
  }

  getQueryString(query) {
    const queryObject = {...this._defaultQuery, ...query};
    return Object.keys(queryObject).map(k => `${encodeURIComponent(k)}=${encodeURIComponent(queryObject[k])}`).join('&');
  }


}
