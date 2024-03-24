import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddToShopComponent } from './add-to-shop.component';

describe('AddToShopComponent', () => {
  let component: AddToShopComponent;
  let fixture: ComponentFixture<AddToShopComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AddToShopComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AddToShopComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
