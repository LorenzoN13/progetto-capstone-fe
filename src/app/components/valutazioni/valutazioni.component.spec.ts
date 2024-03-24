import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ValutazioniComponent } from './valutazioni.component';

describe('ValutazioniComponent', () => {
  let component: ValutazioniComponent;
  let fixture: ComponentFixture<ValutazioniComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ValutazioniComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ValutazioniComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
