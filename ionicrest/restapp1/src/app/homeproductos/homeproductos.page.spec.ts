import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HomeproductosPage } from './homeproductos.page';

describe('HomeproductosPage', () => {
  let component: HomeproductosPage;
  let fixture: ComponentFixture<HomeproductosPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeproductosPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
