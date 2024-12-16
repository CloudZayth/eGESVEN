import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BebidasSnacksPage } from './bebidas-snacks.page';

describe('BebidasSnacksPage', () => {
  let component: BebidasSnacksPage;
  let fixture: ComponentFixture<BebidasSnacksPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(BebidasSnacksPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
