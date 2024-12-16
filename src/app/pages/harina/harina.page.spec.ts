import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HarinaPage } from './harina.page';

describe('HarinaPage', () => {
  let component: HarinaPage;
  let fixture: ComponentFixture<HarinaPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(HarinaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
