import {Injectable} from "@angular/core";
import {BehaviorSubject} from "rxjs";
import {Router} from "@angular/router";
import {HttpClient} from "@angular/common/http";
import {isNull, isUndefined} from "util";

@Injectable()
export class FilesService {


  constructor(private http: HttpClient) {
  }

  download(url) {
    const httpOptions = {
      responseType: 'blob' as 'json'
    };

    return this.http.get(url, httpOptions);
  }

}
