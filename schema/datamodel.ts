/**
 * This represents the current state of the API-responses
 */
export class RankingElementDataModel {
  constructor(
    public leagueName: string,
    public wins: number,
    public losses: number,
    public points: number,
    public games: RankingGameDataModel[] // last games played
  ) { }
}

export class RankingGameDataModel {
  constructor(
    public opponent: string,
    public points: number // point difference of this 
  ) { }
}
