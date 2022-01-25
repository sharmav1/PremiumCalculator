import { ComponentFixture, inject, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { MonthlyPremiumService } from './monthly-premium.service';


describe("Monthly Premium Service", () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
          providers: [MonthlyPremiumService],
          imports: [HttpClientTestingModule],
        });
      });

      it('should return an Observable<ResponsePayload>', inject(
            [HttpTestingController, MonthlyPremiumService],
            (httpMock: HttpTestingController, monthlyPremiumService: MonthlyPremiumService) => {
            const responsePayload = 
                {
                    status: 
                    {
                        code: 200,
                        type: 0,
                        message: "Premium calculated successfully"
                    },
                    monthlyPremium: 250
                }
                const occupationId = 1002;
                const age = 30;
                const sumInsured = 100000;
                monthlyPremiumService.getMonthlyPremium(occupationId, age, sumInsured).subscribe(result => {
                    expect(result.monthlyPremium).toBe(250);
                 });

                const req = httpMock.expectOne(`${monthlyPremiumService.monthlyPremiumUrl}/${occupationId}/monthly?age=${age}&sumInsured=${sumInsured}`);
                expect(req.request.method).toBe("GET");
                req.flush(responsePayload);
                httpMock.verify();
        }));
     
    });
      