import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, Validators, ValidatorFn, AbstractControl, Validator, ValidationErrors } from '@angular/forms';
import { IOccupation } from './occupation';
import { OccupationService } from './occupation.service';
import * as moment from 'moment';
import { MonthlyPremiumService } from './monthly-premium.service';
import { ResponsePayload } from './responsePayload';

@Component({
  selector: 'app-calculator',
  templateUrl: './calculator.component.html',
  styleUrls: ['./calculator.component.css']
})
export class CalculatorComponent implements OnInit {
  premiumCalculatorForm!: FormGroup;
  submitted: boolean = false;
  occupations: IOccupation[] = [];   
  response!: ResponsePayload;
  monthlyPremium!: number;
  customerAge!: number;

  constructor(private fb: FormBuilder, 
    private occupationService: OccupationService,
    private monthlyPremiumService: MonthlyPremiumService) { }

  ngOnInit(): void {
    this.premiumCalculatorForm = this.fb.group({
      name: ['', Validators.required],
      age: [''],
      dateOfBirth: ['', [Validators.required, this.dateValidator]],
      sumInsured: ['', Validators.required],
      occupation: ['', Validators.required]
    });
    this.getOccupations();
  }

  dateValidator(c: AbstractControl)
  {
    if(new Date(c.value).getTime() > Date.now()){
      return {'dob_error_invalid': 'Date of birth cannot be future date'}
    }
    let age = moment().diff(moment(new Date(c.value), 'MMDDYYYY'), 'years')
    if (age <= 0 || age >= 100){
      return {'dob_error_invalid_range': 'Date of birth must be between 0 to 100 years'}
    } 
    return null;
  }

  get f() { return this.premiumCalculatorForm.controls; }

  onSubmit(){
    this.submitted = true;
    if (this.premiumCalculatorForm.valid){
      // code in case of success
    }
  }

  getOccupations() {
    this.occupationService.getOccupations().subscribe((result: IOccupation[]) => {
      this.occupations = result;
    });
  }

  onOccupationChange(occupationId: number){
    const formValues = this.premiumCalculatorForm.value;
    if (this.customerAge <= 0 || formValues.sumInsured <= 0){
      return;
    }
    this.monthlyPremiumService.getMonthlyPremium(occupationId, this.customerAge, formValues.sumInsured)
    .subscribe((result: ResponsePayload) => {
      this.response = result;
      this.monthlyPremium = result.monthlyPremium;
    });
  }

  onFormSubmit(){
    const formValues = this.premiumCalculatorForm.value;
    if (this.customerAge <= 0 || formValues.sumInsured <= 0 || formValues.occupation <= 0){
      return;
    }
    this.monthlyPremiumService.getMonthlyPremium(formValues.occupation, this.customerAge, formValues.sumInsured)
    .subscribe((result: ResponsePayload) => {
      this.response = result;
      this.monthlyPremium = result.monthlyPremium;
    });
    
  }

  onDobChange(dob: any){
    console.log(dob);
    let age = moment().diff(moment(new Date(dob), 'MMDDYYYY'), 'years');
    console.log(age);
    this.customerAge = age;
  }

}


