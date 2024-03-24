import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BancomatComponent } from './bancomat.component';

describe('BancomatComponent', () => {
  let component: BancomatComponent;
  let fixture: ComponentFixture<BancomatComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BancomatComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BancomatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
