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

let rankings = require('../../../examples/rankings.json');
let counts = [20, 50, 100, 150, 200, 250];

// For now: Just calculate the february 2017 ranking.
let beginDate = new Date(2016, 2, 1);
let endDate = new Date(2017, 1, 28);

let algorithms = [
    {
        name: "First one",
        method: require('./calcTest.js')
    }
];

function calcStats(absoluteDifferences, relativeDifferences, count) {

    let result = {
        totalAbs: 0,
        totalRel: 0,

        averageAbs: 0,
        averageRel: 0
    };

    for(let i = 0; i < count; i++) {
        result.totalAbs += absoluteDifferences[i];
        result.totalRel += relativeDifferences[i];
    }

    result.averageAbs = result.totalAbs / count;
    result.averageRel = result.totalRel / count;

    return result;
}

algorithms.forEach(algorithm => {

    var absoluteDifferences = [];
    var relativeDifferences = [];

    rankings[0].team.forEach(team => {

        let teamName = team.name;
        let caluclatedAverage = algorithm.method(team.name, new Date(2016, 2, 1), new Date(2017, 1, 28));
        let wftdaAverage = team.score;
        let absoluteDifference = Math.abs(caluclatedAverage - wftdaAverage);
        let relativeDifference = absoluteDifference / wftdaAverage * 100;

        absoluteDifferences.push(absoluteDifference);
        relativeDifferences.push(relativeDifference);

        // console.log(teamName + ' - ' + caluclatedAverage + ' (WFTDA: ' + wftdaAverage + ', abs. diff: ' + absoluteDifference + ', rel. diff: ' + relativeDifference + '%)' )

    });



    console.log("Analysed algorithm '" + algorithm.name + "'");
    counts.forEach(count => {
        let stats = calcStats(absoluteDifferences, relativeDifferences, count);
        console.log("   > First " + count + " teams: Avg. relative difference: " + stats.averageRel);
    });



});


