import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { SVGMorphingPage } from './svgmorphing.page';

describe('SVGMorphingPage', () => {
  let component: SVGMorphingPage;
  let fixture: ComponentFixture<SVGMorphingPage>;
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SVGMorphingPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      providers: [
      ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SVGMorphingPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
