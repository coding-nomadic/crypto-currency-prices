import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BitcoinLiveComponent } from './bitcoin-live.component';

describe('BitcoinLiveComponent', () => {
  let component: BitcoinLiveComponent;
  let fixture: ComponentFixture<BitcoinLiveComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BitcoinLiveComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BitcoinLiveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
