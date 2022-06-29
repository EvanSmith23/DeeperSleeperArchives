import { connect } from 'react-redux';
import React from 'react';
import { Button, Combobox } from '@salesforce/design-system-react';

import ChartAndStats from './ChartAndStats';

import { useEffect } from 'react';

const weeks = [
	{
		id: '0',
		label: 'All Season',
	},
	{
		id: '1',
		label: 'Week 1',
	},
    {
		id: '2',
		label: 'Week 2',
	},
    {
		id: '3',
		label: 'Week 3',
	},
    {
		id: '4',
		label: 'Week 4',
	},
    {
		id: '5',
		label: 'Week 5',
	},
    {
		id: '6',
		label: 'Week 6',
	},    {
		id: '7',
		label: 'Week 7',
	},    {
		id: '8',
		label: 'Week 8',
	},
	{
		id: '9',
		label: 'Week 9',
	},
    {
		id: '10',
		label: 'Week 10',
	},
    {
		id: '11',
		label: 'Week 11',
	},
    {
		id: '12',
		label: 'Week 12',
	},
    {
		id: '13',
		label: 'Week 13',
	},
    {
		id: '14',
		label: 'Week 14',
	},   
];

const WEEK_1 = 1599624900000;
const WEEK_IN_MILLISECONDS = 604800000;

const AllTransactions = (props) => { 
    const [editId, setEditId] = React.useState('');
    const [inputValue, setInputValue] = React.useState('');
    const [selection, setSelection] = 
    React.useState([{
		id: '0',
		label: 'All Season',
	}]);

    useEffect(() => {
        console.log(props.ownerTransactions)
    },[props.ownerTransactions])

    return (
        <div>
            <div className="slds-grid">
                <div className="slds-size_1-of-2">
                    <Combobox
                        id="combobox-inline-single"
                        variant="readonly"
                        labels={{
                            label: '',
                            placeholder: 'All Season',
                        }}
                        options={weeks}
                        selection={selection}
                        value={inputValue}
                        events={{
                            onRequestRemoveSelectedOption: (event, data) => {
                                setSelection([]);
                                setInputValue('');
                            },
                            onSelect: (event, data) => {
                                console.log(event,data)
                                setSelection(data.selection);
                                setInputValue(data.selection[0].label);
                            },
                        }}
                    />
                </div>
            </div>
            <div className="slds-text-heading_small slds-p-top_x-large slds-m-top_xx-small">Recent Transactions</div>
            {props.ownerTransactions
                .filter((transaction) => {
                    if (selection.length > 0) {
                        if (parseInt(selection[0].id) > 0) {
                            let weekStart = WEEK_1 + (WEEK_IN_MILLISECONDS * (parseInt(selection[0].id) - 1));
                            let weekEnd = WEEK_1 + (WEEK_IN_MILLISECONDS * parseInt(selection[0].id));

                            if (weekStart < transaction.created && weekEnd > transaction.created) {
                                return true;
                            } else {
                                return false;
                            }
                        } else {
                            return true;
                        }
                    } else {
                        return true;
                    }
                })
                .sort(function(a, b){return a.created - b.created})
                .map((transaction) => {
                    return (
                        <div
                            key={transaction.transaction_id}
                        >
                            <div className="slds-grid slds-p-vertical_xx-small" style={{ borderTop: '1px solid #bbb' }}>
                                {/* 
                                <div className="slds-size_2-of-12 slds-align_absolute-center">{props.teamsInLeague[transaction.creator].display_name} </div>

                                 transaction.created !== undefined ? (
                                    <div className="slds-size_2-of-12 slds-p-top_x-small slds-p-horizontal_xx-small">
                                        {Math.ceil((transaction.created - WEEK_1) / WEEK_IN_MILLISECONDS) > 0 ? (
                                            <div className="slds-text-title_caps" style={{  color: '#fff'}}>Week {Math.ceil((transaction.created - WEEK_1) / WEEK_IN_MILLISECONDS)}</div>
                                        ) : (
                                            <div className="slds-text-title_caps" style={{  color: '#fff'}}>Preseason</div>
                                        )}

                                        <div 
                                            style={transaction.status === 'complete' ? ({ fontSize: '12px', color: '#00ceb8'}) : ({ fontSize: '12px', color: '#ff2a6d'})}
                                        >{transaction.status}</div>
                                    </div>
                                ) : "Offseason" */}
                                {transaction.added !== undefined ? (
                                    <div className="slds-size_5-of-12">
                                        <div className="slds-grid">
                                            {window.innerWidth > 480 ? (
                                                <div className="slds-large-size_1-of-4 slds-p-left_small slds-align_absolute-center">
                                                    <img 
                                                        className="slds-large-size_1-of-1"
                                                        src={isNaN(transaction.added.player_id) ? ("https://sleepercdn.com/images/team_logos/nfl/" + transaction.added.player_id.toLowerCase() + ".png") : ("https://sleepercdn.com/content/nfl/players/thumb/" + transaction.added.player_id + ".jpg")} 
                                                        style={{ height: '35px', width: '35px', background: 'center center / cover rgb(239, 239, 239)', borderRadius: '50%', objectFit: 'cover'}} 
                                                    />
                                                </div>
                                            ) : null }
                                            <div className="slds-col slds-small-size_1-of-1 slds-large-size_3-of-4 slds-p-left_small">
                                                <div style={{ fontSize: '12px', color: '#000'}}><span style={{ fontSize: '16px', color: '#00ceb8'}}>+ </span>{transaction.added.full_name}</div>
                                                <div style={{ color: '#333', fontSize: '10px'}}>
                                                    {transaction.added.fantasy_positions !== undefined ? transaction.added.fantasy_positions.map((position) => {
                                                        return (position + " - ")
                                                    }) : null}
                                                    {transaction.added.team}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ) : <div className="slds-size_5-of-12" />}
                                {transaction.dropped !== undefined ? (
                                    <div className="slds-size_5-of-12">
                                        <div className="slds-grid">
                                            {window.innerWidth > 480 ? (
                                                <div className="slds-large-size_1-of-4 slds-p-left_small slds-align_absolute-center">
                                                    <img 
                                                        src={isNaN(transaction.dropped.player_id) ? ("https://sleepercdn.com/images/team_logos/nfl/" + transaction.dropped.player_id.toLowerCase() + ".png") : ("https://sleepercdn.com/content/nfl/players/thumb/" + transaction.dropped.player_id + ".jpg")} 
                                                        style={{ height: '35px', width: '35px', background: 'center center / cover rgb(239, 239, 239)', borderRadius: '50%', objectFit: 'cover'}} 
                                                    />
                                                </div>
                                            ) : null }
                                            <div className="slds-col slds-small-size_1-of-1 slds-large-size_3-of-4 slds-p-left_small">
                                                <div style={{ fontSize: '12px', color: '#000'}}><span style={{ fontSize: '16px', color: '#ff2a6d'}}>- </span>{transaction.dropped.full_name}</div>
                                                <div style={{ color: '#333', fontSize: '10px'}}>
                                                    {transaction.dropped.fantasy_positions !== undefined ? transaction.dropped.fantasy_positions.map((position) => {
                                                        return (position + " - ")
                                                    }) : null}
                                                    {transaction.dropped.team}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ) : <div className="slds-size_5-of-12" />}
                            </div>
                            {/* 
                                    <div 
                                        className="slds-p-around_medium slds-align_absolute-center" 
                                    >
                                        <Button 
                                            style={{lineHeight: '1.75rem', color: '#00ceb8'}}
                                            variant="base" 
                                            data-transaction-id={transaction.transaction_id}
                                            onClick={(e) => {
                                                e.preventDefault();
                                                setEditId(e.target.dataset.transactionId)
                                            }}
                                        >Explore</Button>
                                    </div>
                                </div>
                            */}
                            {/*   
                            <ChartAndStats 
                                show={transaction.transaction_id === editId}
                                added={transaction.added}
                                dropped={transaction.dropped}
                                chartId={'transaction-' + transaction.transaction_id}
                            />  
                             */}  
                        </div>
                    )
                })}
        </div>
    );
}


const mapStateToProps = (state) => ({
    ownerTransactions: state.league.ownerTransactions,
    teams: state.league.teams,
    teamsInLeague: state.league.teamsInLeague,
});

const mapDispatchToProps = (dispatch) => ({});

export default connect(mapStateToProps, mapDispatchToProps)(AllTransactions);
