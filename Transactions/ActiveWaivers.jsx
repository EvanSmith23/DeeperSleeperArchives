import { connect } from 'react-redux';
import React, { useEffect } from 'react';
import { Button } from '@salesforce/design-system-react';

const ActiveWaivers = (props) => { 
    const getDaysUntilCleared = (statusUpdated) => {
        let waiverTime = statusUpdated + props.settings.waiver_clear_days * 86400000;
        let now = new Date().getTime(); 
        let timeLeft = waiverTime - now; 
        let days = Math.floor(timeLeft / 86400000);
        let hours = Math.floor((timeLeft % 86400000) / 3600000);
        let minutes = Math.floor(((timeLeft % 86400000) % 3600000) / 60000);

        let time = 'Available in ';

        if (days > 1)
            time += days + ' days ';
        else if (days > 0)
            time += days + ' day ';

        if (hours > 1)
            time += hours + ' hours ';
        else if (hours > 0)
            time += hours + ' hour ';

        if (minutes > 1)
            time += minutes + ' minutes ';
        else if (minutes > 0)
            time += minutes + ' minute ';

        return time;
    }

    return (
        <div>
            <div 
                className="slds-p-vertical_xx-small slds-text-heading_medium"
                style={{ color: '#fff'}}
            >Active Waivers</div>
            {props.transactions.sort(function(a, b){return a.status_updated - b.status_updated}).map((transaction) => {
                if (transaction.drops !==  null && ((transaction.status_updated + props.settings.waiver_clear_days * 86400000) - new Date().getTime() > 0)) {
                    return (
                        <div 
                            className="slds-p-around_small slds-m-around_small slds-grid" 
                            style={{ border: '1px solid #3a465b', borderRadius: '10px', backgroundColor: 'rgba(58,70,91,0.5)',borderBottom: '1.5px solid #00ceb8'}}
                        >
                            <div className="slds-size_1-of-4 slds-align_absolute-center">
                                <img 
                                    src={isNaN(Object.keys(transaction.drops)[0]) ? ("https://sleepercdn.com/images/team_logos/nfl/" + Object.keys(transaction.drops)[0].toLowerCase() + ".png") : ("https://sleepercdn.com/content/nfl/players/thumb/" + Object.keys(transaction.drops)[0] + ".jpg")} 
                                    style={{ height: '45px', width: '45px', background: 'center center / cover rgb(239, 239, 239)', borderRadius: '50%', objectFit: 'cover'}} 
                                />
                            </div>
                            <div className="slds-size_3-of-4" style={{ color: '#fff', fontSize: '.75rem'}}>
                                <div style={{ fontSize: '14px'}}>{transaction.full_name}</div>

                                <div style={{ color: '#ccc', fontSize: '10px'}}>
                                    {transaction.fantasy_positions !== undefined ? transaction.fantasy_positions.map((position) => {
                                        return (position + " - ")
                                    }) : null}
                                    {transaction.team}
                                </div>
                                <div>{getDaysUntilCleared(transaction.status_updated)}</div>
                            </div>
                        </div>
                    )
                }
            })}
        </div>
    )


}

const mapStateToProps = (state) => ({
    transactions: state.league.transactions,
    settings: state.league.settings,
});

const mapDispatchToProps = (dispatch) => ({
});

export default connect(mapStateToProps, mapDispatchToProps)(ActiveWaivers);