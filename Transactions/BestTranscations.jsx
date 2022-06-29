import { connect } from 'react-redux';
import React, { useEffect } from 'react';
import { Button, Combobox } from '@salesforce/design-system-react';

import {} from '../../Actions';

const positions = [
	{
		id: '0',
		label: 'All Positions',
	},
	{
		id: '1',
		label: 'QB',
	},
    {
		id: '2',
		label: 'RB',
	},
    {
		id: '3',
		label: 'WR',
	},
    {
		id: '4',
		label: 'TE',
	},
    {
		id: '5',
		label: 'K',
	},
    {
		id: '6',
		label: 'DEF',
	} 
];
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

const BestTransactions = (props) => { 
    const [teams, setTeams] = React.useState([{
        id: '0',
        label: 'All Teams'
    }]);
    const [inputValue, setInputValue] = React.useState('');
    const [selection, setSelection] = 
    React.useState([{
		id: '0',
		label: 'All Positions',
	}]);

    const [inputValue2, setInputValue2] = React.useState('');
    const [selection2, setSelection2] = 
    React.useState([{
		id: '0',
		label: 'All Weeks',
	}]);

    const [inputValue3, setInputValue3] = React.useState('');
    const [selection3, setSelection3] = 
    React.useState([{
		id: '0',
		label: 'All Teams',
	}]);

    const ifOneTwoThree = (transaction) => {
        return (transaction.position == selection[0].label && transaction.Week == selection2[0].id  && transaction.Creator == inputValue) ? true : false;
    }

    const ifOneTwo = (transaction) => {
        return (transaction.position == selection[0].label && transaction.Week == selection2[0].id) ? true : false;
    }

    const ifTwoThree = (transaction) => {
        return (transaction.Week == selection2[0].id  && transaction.Creator == inputValue3) ? true : false;
    }

    const ifOneThree = (transaction) => {
        return (transaction.position == selection[0].label  && transaction.Creator == inputValue3) ? true : false;
    }

    const filter = (transaction) =>  {
        if (!transaction.GameData) {
            return false;
        } else {
            if (selection.length > 0 && parseInt(selection[0].id) > 0 && selection2.length > 0 && parseInt(selection2[0].id) > 0 && selection3.length > 0 && parseInt(selection3[0].id) > 0) {
                return ifOneTwoThree(transaction);
            } else if (selection.length > 0 && parseInt(selection[0].id) > 0 && selection2.length > 0 && parseInt(selection2[0].id) > 0) {
                return ifOneTwo(transaction);
            } else if (selection2.length > 0 && parseInt(selection2[0].id) > 0 && selection3.length > 0 && parseInt(selection3[0].id) > 0) {
                return ifTwoThree(transaction);
            } else if (selection.length > 0 && parseInt(selection[0].id) > 0 && selection3.length > 0 && parseInt(selection3[0].id) > 0) {
                return ifOneThree(transaction);
            } else if (selection.length > 0 && parseInt(selection[0].id) > 0) {
                return transaction.position == selection[0].label ? true : false;
            } else if (selection2.length > 0 && parseInt(selection2[0].id) > 0) {
                return transaction.Week == selection2[0].id ? true : false;
            } else if (selection3.length > 0 && parseInt(selection3[0].id) > 0) {
                return transaction.Creator == inputValue3 ? true : false;
            } else {
                return true;
            }
        }
    }

    return (
        <div>
            <div className="slds-grid slds-p-vertical_small">
                <div className="slds-size_2-of-5 slds-text-heading_medium section-title">Best {props.year} Waiver Pickups</div>
                <div className="slds-size_1-of-5 slds-p-right_large">
                    <Combobox
                        id="combobox-inline-single"
                        variant="readonly"
                        labels={{
                            label: '',
                            placeholder: 'All Positions',
                        }}
                        options={positions}
                        selection={selection}
                        value={inputValue}
                        events={{
                            onRequestRemoveSelectedOption: (event, data) => {
                                setSelection([]);
                                setInputValue('');
                            },
                            onSelect: (event, data) => {
                                setSelection(data.selection);
                                setInputValue(data.selection[0].label);
                            },
                        }}
                    />
                </div> 
                <div className="slds-size_1-of-5 slds-p-right_large">
                    <Combobox
                        id="combobox-inline-single"
                        variant="readonly"
                        labels={{
                            label: '',
                            placeholder: 'All Weeks',
                        }}
                        options={weeks}
                        selection={selection2}
                        value={inputValue2}
                        events={{
                            onRequestRemoveSelectedOption: (event, data) => {
                                setSelection2([]);
                                setInputValue2('');
                            },
                            onSelect: (event, data) => {
                                console.log(event,data)
                                setSelection2(data.selection);
                                setInputValue2(data.selection[0].label);
                            },
                        }}
                    />
                </div>         
                <div className="slds-size_1-of-5" >
                    <Combobox
                        id="combobox-inline-single"
                        variant="readonly"
                        labels={{
                            label: '',
                            placeholder: 'All Teams',
                        }}
                        options={teams.concat(props.teams)}
                        selection={selection3}
                        value={inputValue3}
                        events={{
                            onRequestRemoveSelectedOption: (event, data) => {
                                setSelection3([]);
                                setInputValue3('');
                            },
                            onSelect: (event, data) => {
                                setSelection3(data.selection);
                                setInputValue3(data.selection[0].user_id);
                            },
                        }}
                    />
                </div>
            </div>
            <div className="slds-grid slds-p-vertical_xx-small" style={{ borderTop: '1px solid #bbb' }}>
                <div className="slds-col slds-wrap slds-size_1-of-5">Points</div>
                <div className="slds-col slds-wrap slds-size_1-of-5">Name</div>
                <div className="slds-col slds-wrap slds-size_1-of-5">Position</div>
                <div className="slds-col slds-wrap slds-size_1-of-5">Week</div>
                <div className="slds-col slds-wrap slds-size_1-of-5">Team</div>
            </div>
            {props.rankedLeagueTransactions
            .filter((transaction) => filter(transaction))
            .sort(function(a, b){return b.GameData.FantasyPoints - a.GameData.FantasyPoints})
            .map((transaction) => {
                return (
                    <div className="slds-grid slds-p-vertical_xx-small" style={{ borderTop: '1px solid #bbb' }}>
                        <div className="slds-col slds-wrap slds-size_1-of-5">{transaction.GameData.FantasyPoints}</div>
                        <div className="slds-col slds-wrap slds-size_1-of-5">{transaction.full_name}</div>
                        <div className="slds-col slds-wrap slds-size_1-of-5">{transaction.position}</div>
                        <div className="slds-col slds-wrap slds-size_1-of-5">Week {transaction.Week}</div>
                        <div className="slds-col slds-wrap slds-size_1-of-5" data-creator={transaction.Creator}>{transaction.CreatorName}</div>
                    </div>
                )
            })}
        </div>
    );
}


const mapStateToProps = (state) => ({
    year: state.user.year,
    teams: state.league.teams,
    rankedLeagueTransactions: state.league.rankedLeagueTransactions,
});

const mapDispatchToProps = (dispatch) => ({});

export default connect(mapStateToProps, mapDispatchToProps)(BestTransactions);
