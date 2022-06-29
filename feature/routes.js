const express = require('express');
const router = express.Router();

// TODO: LEAGUE Routes
const leagues_controller = require('./api/league/league.controller.js');
router.get('/league/transactions/user/:league_id/:user_id', leagues_controller.retrieve_transactions_by_user);
router.get('/league/transactions/:year/league/rank/:league_id', leagues_controller.retrieve_ranked_league_transactions);