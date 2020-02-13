import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ColumnchartPage } from './columnchart.page';

describe('ColumnchartPage', () => {
  let component: ColumnchartPage;
  let fixture: ComponentFixture<ColumnchartPage>;
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ColumnchartPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      providers: [
      ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ColumnchartPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
