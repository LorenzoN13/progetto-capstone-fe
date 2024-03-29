import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResierimborsiComponent } from './resierimborsi.component';

describe('ResierimborsiComponent', () => {
  let component: ResierimborsiComponent;
  let fixture: ComponentFixture<ResierimborsiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ResierimborsiComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ResierimborsiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
