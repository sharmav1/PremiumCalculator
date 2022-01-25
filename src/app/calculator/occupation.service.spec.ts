import { ComponentFixture, inject, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { OccupationService } from './occupation.service';

describe("Occupation Service", () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
          providers: [OccupationService],
          imports: [HttpClientTestingModule],
        });
      });

      it('should return an Observable<IOccupation[]>', inject(
            [HttpTestingController, OccupationService],
            (httpMock: HttpTestingController, occupationService: OccupationService) => {
            const occupationResult = 
                [
                    {id: 1001, description: 'Cleaner'},
                    {id: 1002, description: 'Doctor'},
                    {id: 1003, description: 'Author'},
                    {id: 1004, description: 'Farmer'},
                    {id: 1005, description: 'Mechanic'},
                    {id: 1006, description: 'Florist'}
                ]

                occupationService.getOccupations().subscribe(result => {
                    console.log(result);
                    expect(result.length).toBe(6);
                 });

                const req = httpMock.expectOne(`${occupationService.occupationUrl}`);
                expect(req.request.method).toBe("GET");
                req.flush(occupationResult);
                httpMock.verify();
        }));
     
    });
      