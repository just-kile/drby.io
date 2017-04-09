const bouts = require('../../../examples/bouts.json');
const rankings = require('../../../examples/rankings.json');

let teamMappings = require('./teamMappings.json');

var teams = [];

function findTeam(teamName) {
    if (!teams.find(t => {
            return t === teamName
        })) {
        teams.push(teamName);

        let override = teamMappings.find(mapping => {
                return mapping.from === teamName
            }
        );
        if (override) {
            teamName = override.to;
        }

        var foundTeam = false;

        rankings.forEach(ranking => {
            if (!foundTeam) {
                foundTeam = ranking.team.find(team => {
                    return team.name === teamName
                })
            }
        });

        if (!foundTeam) {
            console.log('Did not find ' + teamName);

            var alternate
            rankings.forEach(ranking => {
                if (!alternate) {
                    alternate = ranking.team.find(team => {
                        return team.name.substr(0, 6) === teamName.substr(0, 6)
                    })
                }
            })
            if (alternate) {
                console.log("    -> May be " + alternate.name);
                console.log("    => { from: '" + teamName + "', to: '" + alternate.name + "'}");
            } else {
                console.log("     -> ???");
            }


        }

    }
}

bouts.forEach(bout => {
    findTeam(bout.homeTeam);
    findTeam(bout.awayTeam);
});