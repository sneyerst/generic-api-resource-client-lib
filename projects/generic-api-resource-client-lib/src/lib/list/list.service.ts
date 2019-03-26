import {Injectable} from "@angular/core";
import {BehaviorSubject} from "rxjs";
import {Router} from "@angular/router";
import {isNull, isUndefined} from "util";
import {HttpClient} from "@angular/common/http";

@Injectable()
export class ListService {

  private _url: string;
  private _apiEndpointUri: string;
  private _defaultQuery: {};

  private _resources = new BehaviorSubject([]);
  private _fields = new BehaviorSubject([]);
  private _filters = new BehaviorSubject([]);
  private _visualisations = new BehaviorSubject([]);

  get resourcesObservable() {
    return this._resources.asObservable();
  }

  get fieldsObservable() {
    return this._fields.asObservable();
  }

  get filtersObservable() {
    return this._filters.asObservable();
  }

  get visualisationsObservable() {
    return this._visualisations.asObservable();
  }

  set resources(resources) {
    this._resources.next(resources);
  }

  set fields(fields) {
    this._fields.next(fields);
  }

  set filters(filters) {
    this._filters.next(filters);
  }

  set visualisations(visualisations) {
    this._visualisations.next(visualisations);
  }

  constructor(private http: HttpClient, private router: Router) {
  }

  getResources(query = {}) {
    const url = this.getApiEndpointUrl(query);
    this.http.get(url).toPromise()
      .then((response) => {
        this.resources = response['response']['data'];
        if (response['response']['metadata'] && response['response']['metadata']['fields']) {
          this.fields = response['response']['metadata']['fields'];
        }
        if (response['response']['metadata'] && response['response']['metadata']['filters']) {
          this.filters = response['response']['metadata']['filters'];
        }
        if (response['response']['metadata'] && response['response']['metadata']['visualisations']) {
          this.visualisations = response['response']['metadata']['visualisations'];
        }
      });
  }

  getResourcesXLSX(attributes?) {
    const url = this.getApiEndpointUrl({}, 'xlsx');
    const httpOptions = {
      responseType: 'blob' as 'json'
    };
    return this.http.get(url, httpOptions);
  }

  setApiEndpoint(url: string, apiEndpointUri: string, defaultQuery: {}) {
    this._url = url;
    this._apiEndpointUri = apiEndpointUri;
    this._defaultQuery = defaultQuery;
    this.getResources();
  }

  getApiEndpointUrl(additionalQuery?: {}, format?: string) {
    let apiEndpointUri = this._apiEndpointUri;
    if (!isUndefined(format)) {
      apiEndpointUri += '.' + format;
    }

    let query = this._defaultQuery;
    if (additionalQuery) {
      query = {...this._defaultQuery, ...additionalQuery};
    }
    const querystring = Object.keys(query).map(k => `${encodeURIComponent(k)}=${encodeURIComponent(query[k])}`).join('&');
    if (querystring) {
      apiEndpointUri += '?' + querystring;
    }

    return `${this._url}${apiEndpointUri}`;
  }

  createResource(resourceAttributes) {
    const url = `${this._url}/${this._apiEndpointUri}`;
    return this.http.post(url, resourceAttributes).toPromise();
  }


}
