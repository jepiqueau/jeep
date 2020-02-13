import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FlipimagesPage } from './flipimages.page';

describe('FlipimagesPage', () => {
  let component: FlipimagesPage;
  let fixture: ComponentFixture<FlipimagesPage>;
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FlipimagesPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      providers: [
      ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FlipimagesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
