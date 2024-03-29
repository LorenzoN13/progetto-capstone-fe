import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ServizioclientiComponent } from './servizioclienti.component';

describe('ServizioclientiComponent', () => {
  let component: ServizioclientiComponent;
  let fixture: ComponentFixture<ServizioclientiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ServizioclientiComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ServizioclientiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
