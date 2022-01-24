import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, tap } from "rxjs";
import { ResponsePayload } from "./responsePayload";

@Injectable({
    providedIn: 'root'
})
export class MonthlyPremiumService{
    monthlyPremiumUrl = 'https://localhost:7242/api/v1/premium';

    constructor(private httpClient: HttpClient){}

    getMonthlyPremium(occupationId: number, age: number, sumInsured: number): Observable<ResponsePayload>{
        return this.httpClient.get<ResponsePayload>(
            this.monthlyPremiumUrl + '/'+ occupationId  + '/monthly?age=' + age + '&sumInsured=' +  sumInsured)
            .pipe(
            tap(payload => console.log("Response: ", JSON.stringify(payload)))
        )
    }

    
}