import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LogSystemComponent } from './log-system.component';

describe('LogSystemComponent', () => {
  let component: LogSystemComponent;
  let fixture: ComponentFixture<LogSystemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LogSystemComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(LogSystemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
