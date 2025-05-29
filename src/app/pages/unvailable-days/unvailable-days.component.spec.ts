import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UnvailableDaysComponent } from './unvailable-days.component';

describe('UnvailableDaysComponent', () => {
  let component: UnvailableDaysComponent;
  let fixture: ComponentFixture<UnvailableDaysComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UnvailableDaysComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UnvailableDaysComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
