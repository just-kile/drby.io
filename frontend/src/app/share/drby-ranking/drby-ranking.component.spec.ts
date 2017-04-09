import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DrbyRankingComponent } from './drby-ranking.component';
import { DrbyLeagueDataModel } from '../api/datamodels.model';
import { DataService } from '../api/data.service';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

class MockDataService {
    public leagues = new BehaviorSubject<DrbyLeagueDataModel[]>([]);
};


describe('DrbyRankingComponent', () => {
  let component: DrbyRankingComponent;
  let fixture: ComponentFixture<DrbyRankingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DrbyRankingComponent ], 
      providers: [
        {provide: DataService, useClass: MockDataService}
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DrbyRankingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
