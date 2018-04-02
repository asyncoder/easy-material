import { Injectable } from "@angular/core";
import {
  HttpClient,
  HttpHeaders,
  HttpErrorResponse
} from "@angular/common/http";
import { Observable } from "rxjs/Observable";
import { of } from "rxjs/observable/of";

const API: string = "http://localhost:51203/odata/";
const OPTIONS = {
  headers: new HttpHeaders().set("Content-Type", "application/json")
};

@Injectable()
export class ExampleService {
  constructor(private httpClient: HttpClient) {}

  getData(url: string): Observable<any> {
    return this.httpClient.get(`${API}${url}`);
  }

  addItem(url: string, payload: any): Observable<any> {
    return this.httpClient.post(`${API}${url}`, payload, OPTIONS);
  }

  updateItem(url: string, payload: any): Observable<any> {
    return this.httpClient.put(`${API}${url}`, payload, OPTIONS);
  }

  deleteItem(url: string): Observable<any> {
    return this.httpClient.delete(`${API}${url}`, OPTIONS);
  }
}
