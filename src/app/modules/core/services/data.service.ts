import { Injectable } from "@angular/core";
import {
  HttpClient,
  HttpHeaders,
  HttpErrorResponse
} from "@angular/common/http";
import { Observable } from "rxjs/Observable";
import { of } from "rxjs/observable/of";

const OPTIONS = {
  headers: new HttpHeaders().set("Content-Type", "application/json")
};

@Injectable()
export class DataService {
  constructor(private httpClient: HttpClient) {}

  getData(url: string): Observable<any> {
    return this.httpClient.get(`${url}`);
  }

  addItem(url: string, payload: any): Observable<any> {
    return this.httpClient.post(`${url}`, payload, OPTIONS);
  }

  updateItem(url: string, payload: any): Observable<any> {
    return this.httpClient.put(`${url}`, payload, OPTIONS);
  }

  deleteItem(url: string): Observable<any> {
    return this.httpClient.delete(`${url}`, OPTIONS);
  }
}
