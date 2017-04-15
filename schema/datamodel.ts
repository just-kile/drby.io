/**
 * This represents the current state of the API-response for the called endpoint /positions
 */
export class RankingElementDataModel {
  constructor(
    public leagueName: string,
    public wins: number,
    public losses: number,
    public points: number,
    public games: RankingGameDataModel[]
  ) { }
}

export class RankingGameDataModel {
  constructor(
    public opponent: string,
    public points: number
  ) { }
}