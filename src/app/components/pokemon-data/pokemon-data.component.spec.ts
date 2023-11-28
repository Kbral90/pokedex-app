import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PokemonDataComponent } from './pokemon-data.component';

describe('PokemonDataComponent', () => {
  let component: PokemonDataComponent;
  let fixture: ComponentFixture<PokemonDataComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PokemonDataComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PokemonDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
