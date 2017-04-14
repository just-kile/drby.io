/**
 * The calculation performance tester can be used to measure how performance of ranking calculation is - compared
 * to the official ranking.
 *
 * Ranking calculation algorithms under test need to provide a module with a single method with the parameters:
 *      - team Name (string)
 *      - begin of ranking period (date)
 *      - end of ranking period (date)
 * The method needs to output the average ranking points of this team.
 */

let rankings = require('../../../../examples/rankings.json');
let moment = require('moment');


let counts = [20, 50, 100, 150, 200, 250];

// For now: Just calculate the february 2017 ranking.


let dates = [
    moment('2017-03-31'),
    // moment('2017-02-28'),
    // moment('2017-01-31'),
    //moment('2016-06-30'),
];

let algorithms = [
    {
        name: "First one",
        method: require('./calcTest.js')
    },
    {
        name: "Second one",
        method: require('./calcTest2.js')
    },
    {
        name: "Third one",
        method: require('./calcTest3.js')
    }
];

function calcStats(absoluteDifferences, relativeDifferences, count) {

    let result = {
        totalAbs: 0,
        totalRel: 0,

        averageAbs: 0,
        averageRel: 0
    };

    for (let i = 0; i < count; i++) {
        result.totalAbs += absoluteDifferences[i];
        result.totalRel += relativeDifferences[i];
    }

    result.averageAbs = result.totalAbs / count;
    result.averageRel = result.totalRel / count;

    return result;
}

function findRanking(date) {
    return rankings.find(ranking => {
        let rankingDate = moment(ranking.date.$date).startOf('day')
        return rankingDate.isSame(date, 'day')
    });
}

algorithms.forEach(algorithm => {



    dates.forEach(rankingDate => {

        var absoluteDifferences = [];
        var relativeDifferences = [];

        findRanking(rankingDate).team.forEach(team => {

            let endDate = rankingDate.clone();
            let beginDate = rankingDate.clone().subtract(12, 'months').add(1, 'day');


            let teamName = team.name;
            let caluclatedAverage = algorithm.method(team.name, beginDate.toDate(), endDate.toDate());
            let wftdaAverage = team.score;
            let absoluteDifference = Math.abs(caluclatedAverage - wftdaAverage);
            let relativeDifference = absoluteDifference / wftdaAverage * 100;

            absoluteDifferences.push(absoluteDifference);
            relativeDifferences.push(relativeDifference);

        });

        console.log("Analysed algorithm '" + algorithm.name + "'");
        console.log("   > Ranking " + rankingDate.format('DD-MM-YYYY'));
        counts.forEach(count => {
            let stats = calcStats(absoluteDifferences, relativeDifferences, count);
            console.log("   > First " + count + " teams: Avg. relative difference: " + stats.averageRel);
        });
    })





});


