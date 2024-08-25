import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FicheDesuiviComponent } from './fiche-desuivi.component';

describe('FicheDesuiviComponent', () => {
  let component: FicheDesuiviComponent;
  let fixture: ComponentFixture<FicheDesuiviComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FicheDesuiviComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FicheDesuiviComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
