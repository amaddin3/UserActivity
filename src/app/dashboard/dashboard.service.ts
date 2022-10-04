import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { forkJoin, Observable } from "rxjs";




@Injectable({providedIn: 'root'})
export class dashboardService{

    private baseUrl = window.location.origin;
    constructor(private http : HttpClient){

    }

    requestDataFromMultipleSources(): Observable<any[]> {
        let userData = this.http.get<any[]>(`${this.baseUrl}/.netlify/functions/users`);
        let logData = this.http.get<any[]>("assets/logs.json")
        return forkJoin([userData, logData]);
    }   

}