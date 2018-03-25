import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs/Observable";

const url: string = "http://localhost:4200/assets/";

@Injectable()
export class AppService {
  constructor(private httpClient: HttpClient) {}

  getMeta(): Observable<any> {
    return this.httpClient.get(`${url}meta.json`);
  }

  getData(): Observable<any> {
    return this.httpClient.get(`${url}data.json`);
  }
}
