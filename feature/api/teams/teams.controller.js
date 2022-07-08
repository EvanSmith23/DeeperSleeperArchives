const Axios = require('axios');

const Players = require('../../models/salesforce/players');
const TwentyTwentyPlayerGameData = require('../../models/data/twenty_twenty_player_game_data.js');

require('dotenv').config();

module.exports = {
  retrieve_player_season_data: async function (req, res) {
        let { addedPlayerId, droppedPlayerId } = req.body;

        try {
            if (addedPlayerId !== undefined && droppedPlayerId !== undefined) {
                let addedPlayerStats = 
                    await TwentyTwentyPlayerGameData
                    .where({
                        'PlayerID': addedPlayerId,
                        'SeasonType': 1,
                    }).orderBy('Week', 'asc').fetchAll();

                let droppedPlayerStats = 
                    await TwentyTwentyPlayerGameData
                    .where({
                        'PlayerID': droppedPlayerId,
                        'SeasonType': 1,
                    }).orderBy('Week', 'asc').fetchAll();

                res.json({
                    addedPlayer: addedPlayerStats,
                    droppedPlayer: droppedPlayerStats,
                });
            } else if (addedPlayerId == undefined && droppedPlayerId !== undefined) {
                let droppedPlayerStats = 
                    await TwentyTwentyPlayerGameData
                    .where({
                        'PlayerID': droppedPlayerId,
                        'SeasonType': 1,
                    }).orderBy('Week', 'asc').fetchAll();

                res.json({
                    droppedPlayer: droppedPlayerStats,
                });
            } else if (droppedPlayerId == undefined && addedPlayerId !== undefined) {
                let addedPlayerStats = 
                    await TwentyTwentyPlayerGameData
                    .where({
                        'PlayerID': addedPlayerId,
                        'SeasonType': 1,
                    }).orderBy('Week', 'asc').fetchAll();

                res.json({
                    addedPlayer: addedPlayerStats,
                });
            }
        } catch (err) {
            console.log(addedPlayerId);
            console.log(droppedPlayerId);

            console.error(err);
        }
    },
};
