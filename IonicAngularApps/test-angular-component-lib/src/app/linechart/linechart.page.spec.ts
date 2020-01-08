import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { LinechartPage } from './linechart.page';

describe('LinearchartPage', () => {
  let component: LinechartPage;
  let fixture: ComponentFixture<LinechartPage>;
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LinechartPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      providers: [
      ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LinechartPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
