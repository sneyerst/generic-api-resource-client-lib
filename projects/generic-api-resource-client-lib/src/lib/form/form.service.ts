import {Injectable} from "@angular/core";
import {BehaviorSubject} from "rxjs";
import {AngularTokenService} from "angular-token";
import {Router} from "@angular/router";
import {HttpClient} from "@angular/common/http";

@Injectable()
export class FormService {

  private _url: string;
  private _apiEndpointUri: string;
  private _resource = new BehaviorSubject({});
  private _fields = new BehaviorSubject({});
  private _values = new BehaviorSubject({});

  get resourceObservable() {
    return this._resource.asObservable();
  }
  get fieldsObservable() {
    return this._fields.asObservable();
  }
  get valuesObservable() {
    return this._values.asObservable();
  }

  set resource(resource) {
    this._resource.next(resource);
  }
  set fields(fields) {
    this._fields.next(fields);
  }
  set values(values) {
    this._values.next(values);
  }

  constructor(private http: HttpClient, private router: Router, private tokenService: AngularTokenService) {
  }

  setApiEndpoint(url: string, apiEndpointUri: string) {
    this._url = url;
    this._apiEndpointUri = apiEndpointUri;
    this.getResource();
  }

  getResource() {
    const url = `${this._url}/${this._apiEndpointUri}`
    this.http.get(url).toPromise()
      .then((response) => {
        this.resource = response['response']['data'];
        this.fields = response['response']['metadata']['fields'];
        this.values = response['response']['metadata']['values'];
      });
  }

  updateResource(uri, resourceAttributes) {
    const url = `${this._url}/${uri}`;
    return this.http.patch(url, resourceAttributes).toPromise();
  }

  deleteResource(uri) {
    const url = `${this._url}/${uri}`;
    return this.http.delete(url).toPromise();
  }

}
