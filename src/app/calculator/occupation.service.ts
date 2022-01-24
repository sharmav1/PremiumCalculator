import { Injectable } from "@angular/core";
import { HttpClient, HttpErrorResponse } from "@angular/common/http";

import { IOccupation } from "./occupation";
import { tap } from "rxjs/internal/operators/tap";
import { Observable } from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class OccupationService{
    occupationUrl = 'https://localhost:7242/api/v1/occupations';

    constructor(private httpClient: HttpClient){}

    getOccupations(): Observable<IOccupation[]>{
        return this.httpClient.get<IOccupation[]>(this.occupationUrl).pipe(
            //tap(occ => console.log("All Occupations: ", JSON.stringify(occ)))
        )
    }
}