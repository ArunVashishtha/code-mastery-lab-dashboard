import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllchaptersComponent } from './allchapters.component';

describe('AllchaptersComponent', () => {
  let component: AllchaptersComponent;
  let fixture: ComponentFixture<AllchaptersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AllchaptersComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AllchaptersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
