import { Component, OnInit } from '@angular/core';
import { DataService } from '../api/data.service';
import { DrbyLeagueDataModel } from '../api/datamodels.model';


@Component({
  selector: 'drby-ranking',
  templateUrl: './drby-ranking.component.html',
  styleUrls: ['./drby-ranking.component.scss'],
  providers: [DataService]
})
export class DrbyRankingComponent implements OnInit {

  private leagues: DrbyLeagueDataModel[] = [];

  constructor(private dataService: DataService) {
    dataService.leagues.subscribe((leagues) => {
      this.leagues = leagues;
    });
   }

  ngOnInit() {
  }

}
