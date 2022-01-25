import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CalculatorComponent } from './calculator.component';

describe('CalculatorComponent', () => {
  let calculatorComponent: CalculatorComponent;
  let mockFormBuilder;
  let mockOccupationService;
  let mockMonthlyPremiumService;

  mockFormBuilder = jasmine.createSpyObj(['group']);
  mockOccupationService = jasmine.createSpyObj(['getOccupations']);
  mockMonthlyPremiumService = jasmine.createSpyObj(['getMonthlyPremium']);
  calculatorComponent = new CalculatorComponent(mockFormBuilder, mockOccupationService, mockMonthlyPremiumService);
 
  it('should create', () => {
    expect(calculatorComponent).toBeTruthy();
  });
});
