import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LaysMerkenPage } from './lays-merken.page';

describe('LaysMerkenPage', () => {
  let component: LaysMerkenPage;
  let fixture: ComponentFixture<LaysMerkenPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(LaysMerkenPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
