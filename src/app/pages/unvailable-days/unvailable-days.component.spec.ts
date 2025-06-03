import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UnavailableDaysComponent } from './unvailable-days.component';


describe('UnvailableDaysComponent', () => {
  let component: UnavailableDaysComponent;
  let fixture: ComponentFixture<UnavailableDaysComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UnavailableDaysComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UnavailableDaysComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
