import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InformationsStepsComponent } from './informations-steps.component';

describe('InformationsStepsComponent', () => {
  let component: InformationsStepsComponent;
  let fixture: ComponentFixture<InformationsStepsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InformationsStepsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InformationsStepsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
