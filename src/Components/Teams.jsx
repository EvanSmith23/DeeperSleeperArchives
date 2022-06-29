import { connect } from 'react-redux';
import React from 'react';
import { Button } from '@salesforce/design-system-react';

import {
    getTeam, 
    getTransactionsByOwner,
    setOwnerTransactionsId,
} from '../Actions';

const Teams = (props) => { 
    return (
        <div>
            <div 
                className="slds-p-left_xx-small slds-p-top_small slds-text-heading_medium section-title"
            >{props.leagueName} Owners</div>
            {props.teams
            .sort(function(a, b){
                console.log(a,b)
                return b.total_transactions - a.total_transactions
            })
            .map((team) => {
                console.log(team);
                if (props.ownerTransactionsId === '' || (props.ownerTransactionsId !== '' && props.ownerTransactionsId == team.user_id)) {
                    return (
                        <div 
                            key={'team-' + team.user_id}
                            className="slds-grid slds-p-around_x-small slds-m-vertical_x-small"
                            style={{ border: '1px solid #3a465b', borderRadius: '7.5px', backgroundColor: '#3a465b', borderBottom: '2px solid #00ceb8'}}
                        >
                            <div className="slds-size_2-of-12 slds-align_absolute-center">
                                <img 
                                    src={"https://sleepercdn.com/avatars/thumbs/" + team.avatar } 
                                    style={{ height: '45px', width: '45px', border: '1px solid #3a465b', borderRadius: '50%'}} />
                            </div>
                            <div className="slds-size_7-of-12 slds-p-left_small">
                                <div style={{fontSize: '17px', color: '#fff'}}>{team.display_name}</div>
                                <div> 
                                    <Button 
                                        style={{lineHeight: '1.25rem', color: '#00ceb8'}}
                                        data-user-id={team.user_id} 
                                        data-username={team.display_name} 
                                        data-teamname={team.display_name} 
                                        variant="base" 
                                        onClick={(e) => props.onClick(e)}
                                    >Show Transactions</Button>
                                </div>
                            </div>
                            <div className="slds-size_3-of-12 slds-align_absolute-center" style={{color: "#fff", fontSize: '18px'}}>{team.total_transactions}</div>
                        </div>
                    )
                }
            })}
        </div>
    );
}


const mapStateToProps = (state) => ({
    userId: state.user.userId,
    leagueName: state.league.leagueName,
    leagueId: state.league.leagueId,
    teams: state.league.teams,
    ownerTransactionsId: state.league.ownerTransactionsId,
});

const mapDispatchToProps = (dispatch) => ({
    getTeamAndFreeAgents: (leagueId, teamId) =>
        dispatch(getTeamAndFreeAgents(leagueId, teamId)),
    setOwnerTransactionsId: (ownerTransactionsId) =>
        dispatch(setOwnerTransactionsId(ownerTransactionsId)),
    getTransactionsByOwner: (leagueId, userId) => 
        dispatch(getTransactionsByOwner(leagueId, userId)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Teams);