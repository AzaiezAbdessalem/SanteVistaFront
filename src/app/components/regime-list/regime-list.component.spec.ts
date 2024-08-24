import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegimeListComponent } from './regime-list.component';

describe('RegimeListComponent', () => {
  let component: RegimeListComponent;
  let fixture: ComponentFixture<RegimeListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RegimeListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RegimeListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
