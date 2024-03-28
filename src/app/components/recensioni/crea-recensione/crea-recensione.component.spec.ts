import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreaRecensioneComponent } from './crea-recensione.component';

describe('CreaRecensioneComponent', () => {
  let component: CreaRecensioneComponent;
  let fixture: ComponentFixture<CreaRecensioneComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CreaRecensioneComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CreaRecensioneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
