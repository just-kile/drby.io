import { Component, OnInit } from '@angular/core';
import { DataService } from '../api/data.service';
import { RankingElementDataModel } from '../../../../../schema/datamodel';


@Component({
  selector: 'drby-ranking',
  templateUrl: './drby-ranking.component.html',
  styleUrls: ['./drby-ranking.component.scss'],
  providers: [DataService]
})
export class DrbyRankingComponent implements OnInit {

  private ranking: RankingElementDataModel[] = [];

  constructor(private dataService: DataService) {
    dataService.ranking.subscribe((ranking) => {
      this.ranking = ranking;
    });
   }

  ngOnInit() {
  }

}
