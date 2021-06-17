/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { MusteriComponent } from './musteri.component';

describe('musteriComponent', () => {
  let component: MusteriComponent;
  let fixture: ComponentFixture<MusteriComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MusteriComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MusteriComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
