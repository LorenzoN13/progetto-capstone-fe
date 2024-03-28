import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreaValutazioneComponent } from './crea-valutazione.component';

describe('CreaValutazioneComponent', () => {
  let component: CreaValutazioneComponent;
  let fixture: ComponentFixture<CreaValutazioneComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CreaValutazioneComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CreaValutazioneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
