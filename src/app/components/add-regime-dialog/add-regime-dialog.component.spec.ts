import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddRegimeDialogComponent } from './add-regime-dialog.component';

describe('AddRegimeDialogComponent', () => {
  let component: AddRegimeDialogComponent;
  let fixture: ComponentFixture<AddRegimeDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddRegimeDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddRegimeDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
