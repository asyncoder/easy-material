import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs/Observable";

const API: string = "http://localhost:51203/odata/";

@Injectable()
export class ExampleService {
  constructor(private httpClient: HttpClient) {}

  // getMeta(): Observable<any> {
  //   return this.httpClient.get(`${url}meta.json`);
  // }

  getData(url: string): Observable<any> {
    return this.httpClient.get(`${API}${url}`);
  }

  // getDataForm(): Observable<any> {
  //   return this.httpClient.get(`${url}dataForm.json`);
  // }
}
