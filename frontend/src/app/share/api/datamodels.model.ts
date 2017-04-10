export class DrbyLeagueDataModel {
    constructor(
        public rank: number,
        public delta: number,
        public name: string,
        public wins: number,
        public losses: number,
        public weight: number,
        public score: number
    ) { }
}
