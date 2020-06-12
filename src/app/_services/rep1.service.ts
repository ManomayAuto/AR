import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from "../models/user.model";
import { Observable } from "rxjs";
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class Rep1Service {
  private serviceUrl = environment.URL + "/AEEscalation";

  constructor(private http:HttpClient) { }

  getUser():Observable<User[]>{
    return this.http.get<User[]>(this.serviceUrl);
  }

}
