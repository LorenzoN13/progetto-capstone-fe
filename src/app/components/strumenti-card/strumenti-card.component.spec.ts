import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StrumentiCardComponent } from './strumenti-card.component';

describe('StrumentiCardComponent', () => {
  let component: StrumentiCardComponent;
  let fixture: ComponentFixture<StrumentiCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [StrumentiCardComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(StrumentiCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
