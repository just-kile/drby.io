import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { DrbyLeagueDataModel } from './datamodels.model';

@Injectable()
export class DataService {

  public leagues = new BehaviorSubject<DrbyLeagueDataModel[]>([]);

  constructor() {
    this.leagues.next([
      new DrbyLeagueDataModel(1, 0, 'BRCD', 10, 0, 7.23, 1000),
      new DrbyLeagueDataModel(2, 0, 'Gotham', 9, 1, 6.34, 900),
      new DrbyLeagueDataModel(3, 0, 'London', 8, 2, 5.67, 800)
    ]);
  }

}
