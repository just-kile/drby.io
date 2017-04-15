import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { RankingElementDataModel } from '../../../../../schema/datamodel';


@Injectable()
export class DataService {

	public ranking = new BehaviorSubject<RankingElementDataModel[]>([]);

	constructor() {
		this.ranking.next([
			new RankingElementDataModel('BCRD', 10, 0, 1000.34, []),
			new RankingElementDataModel('Gotham', 9, 1, 900.56, []),
			new RankingElementDataModel('London', 8, 2, 800.12, [])
		]);
	}

}
