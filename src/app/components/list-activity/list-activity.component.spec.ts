import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListActivityComponent } from './list-activity.component';

describe('ListActivityComponent', () => {
  let component: ListActivityComponent;
  let fixture: ComponentFixture<ListActivityComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListActivityComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListActivityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
