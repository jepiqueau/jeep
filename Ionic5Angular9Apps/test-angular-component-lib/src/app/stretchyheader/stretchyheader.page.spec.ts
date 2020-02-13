import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StretchyheaderPage } from './stretchyheader.page';

describe('StretchyheaderPage', () => {
  let component: StretchyheaderPage;
  let fixture: ComponentFixture<StretchyheaderPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StretchyheaderPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StretchyheaderPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
