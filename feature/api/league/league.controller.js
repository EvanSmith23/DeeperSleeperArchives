module.exports = {
    retrieve_ranked_league_transactions: async function (req, res) {
        // 1. Call to Sleeper  API
        // 2. Call to Players Table
        // 3. Call to Player Game Data Table
        // http://localhost:5002/api/league/transactions/league/2021/rank/606578628288925696
        try {
            let { league_id, year } = req.params;

            console.log(req.session);

            let owners = await Axios.get('https://api.sleeper.app/v1/league/' + league_id + '/users');

            let leagueOwners = {}
            for (let h = 0; h < owners.data.length; h++){
                console.log(owners.data[h].display_name)

                leagueOwners[owners.data[h].user_id] = owners.data[h]
            }

            let transactions = [];
            for (let i = 1; i < 14; i++){
                let transactionData = await Axios.get('https://api.sleeper.app/v1/league/'+ league_id + '/transactions/' + i.toString());

                transactions = transactions.concat(transactionData.data);
            }

            let rankedTransactions = []
            for (let j = 0; j < transactions.length; j++) {
                if (transactions[j].status == 'complete' && transactions[j].adds !== null) {
                    rankedTransactions.push({
                        'Created': transactions[j].created,
                        'Week': transactions[j].leg,
                        'PlayerID': Object.keys(transactions[j].adds)[0],
                        'Creator': transactions[j].creator,
                        'CreatorName': leagueOwners[transactions[j].creator].display_name
                    })
                }
            }

            for (let k = 0; k < rankedTransactions.length; k++) {
                let playerData = await Players.where('player_id', rankedTransactions[k].PlayerID).fetch();

                rankedTransactions[k].full_name = playerData.get('full_name');
                rankedTransactions[k].fantasy_positions = playerData.get('fantasy_positions');
                rankedTransactions[k].position = playerData.get('position');
                rankedTransactions[k].team = playerData.get('team');
                rankedTransactions[k].fantasy_data_id = playerData.get('fantasy_data_id');

                if (rankedTransactions[k].fantasy_data_id == null) {
                    rankedTransactions[k].GameData = null;
                } else {
                    try {
                        if (year == '2021') {
                            let gameData = await PlayerGameData21.where({
                                'PlayerID': rankedTransactions[k].fantasy_data_id,
                                'Week': rankedTransactions[k].Week,
                                'SeasonType': 1
                            }).fetch();
        
                            rankedTransactions[k].GameData = gameData;
                        }  else  {
                            let gameData = await PlayerGameData20.where({
                                'PlayerID': rankedTransactions[k].fantasy_data_id,
                                'Week': rankedTransactions[k].Week,
                                'SeasonType': 1
                            }).fetch();
        
                            rankedTransactions[k].GameData = gameData;
                        }
                    } catch (err) {
                        console.log("NoRowsFound: ", err);

                        rankedTransactions[k].GameData = null;
                    }
                }
            }

            res.json({
                rankedTransactions: rankedTransactions,
            })
        } catch (err) {
            console.log(err);
        }
    },
    retrieve_transactions_by_user: async function (req, res) {
        try {
            let { league_id, user_id } = req.params;

            let transactions = [];
            for (let i = 0; i < 14; i++){
                let transactionData = await Axios.get('https://api.sleeper.app/v1/league/'+ league_id + '/transactions/' + i.toString());

                transactions = transactions.concat(transactionData.data);
            }

            let userTransactions = []
            for (let j = 0; j < transactions.length; j++) {
                if(transactions[j].status == 'complete'){
                    let tempTransaction = {
                        "transaction_id": transactions[j].transaction_id,
                        "status_updated": transactions[j].status_updated,
                        "created": transactions[j].created,
                        "creator": transactions[j].creator,
                        "type": transactions[j].type,
                        "status": transactions[j].status,
                    };

                    if (transactions[j].creator === user_id) {   
                        if (transactions[j].adds !== null)  {
                            let addedPlayerId = Object.keys(transactions[j].adds)[0];

                            let addedPlayer = await Players.where('player_id', addedPlayerId).fetch();
                            
                            tempTransaction['added'] = {
                                player_id: addedPlayerId,
                                full_name: addedPlayer.get('full_name'),
                                fantasy_positions: addedPlayer.get('fantasy_positions'),
                                position: addedPlayer.get('position'),
                                team: addedPlayer.get('team'),
                                fantasy_data_id: addedPlayer.get('fantasy_data_id'),
                            }
                        }

                        if (transactions[j].drops !== null)  {
                            let droppedPlayerId = Object.keys(transactions[j].drops)[0];

                            let droppedPlayer = await Players.where('player_id', droppedPlayerId).fetch();
                        
                            tempTransaction['dropped'] = {
                                player_id: droppedPlayerId,
                                full_name: droppedPlayer.get('full_name'),
                                fantasy_positions: droppedPlayer.get('fantasy_positions'),
                                position: droppedPlayer.get('position'),
                                team: droppedPlayer.get('team'),
                                fantasy_data_id: droppedPlayer.get('fantasy_data_id'),
                            }
                        }
                    
                        userTransactions.push(tempTransaction)
                    }
                }
            }

            res.json({
                transactions: userTransactions,
            })
        } catch (err) {
            console.log(err);
        }
    },
}