/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { AdressComponent } from './adress.component';

describe('AdressComponent', () => {
  let component: AdressComponent;
  let fixture: ComponentFixture<AdressComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdressComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdressComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
