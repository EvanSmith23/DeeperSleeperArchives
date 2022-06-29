import { connect } from 'react-redux';
import React, { useEffect, useState } from 'react';
import Axios from 'axios';
import useDebounce from '../hooks/useDebounce';

import comboboxFilterAndLimit from '@salesforce/design-system-react/components/combobox/filter';

import {
    Card, 
    Combobox, 
    DataTable, 
    DataTableColumn, 
    DataTableCell,
    Icon,
    IconSettings,
} from '@salesforce/design-system-react';

const CustomDataTableCell = ({ children, ...props }) => (
    <DataTableCell {...props} >{Math.round(children)}</DataTableCell>
);
CustomDataTableCell.displayName = DataTableCell.displayName;


const PlayerComparison = (props) => { 
    const [playerInfo, setPlayerInfo] = React.useState({});
    const [playerData, setPlayerData] = React.useState([]);

    // Combobox Variables
    const [selection, setSelection] = React.useState([]);    
    const [options, setOptions] = React.useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const debouncedSearchTerm = useDebounce(searchTerm, 500);

    const onSubmit = () => {};
    const onRemove = () => {
        setSearchTerm('');
        setSelection([]);
        setOptions([]);
    };

    const onSelect = async (event, data) => {
        setSelection(data.selection);
        setSearchTerm('');
        setOptions([]);

        try {
            let player = await Axios.get('/api/player/' + data.selection[0].label);

            setPlayerData(player.data.playerData);
            setPlayerInfo(player.data.player);
        } catch (err) {
            console.error(err);
        }
    };

    const onChange = (event) => {
        setSearchTerm(event.target.value)
    };

    useEffect(() => {
        if (debouncedSearchTerm) {
            Axios.get('/api/players/' + debouncedSearchTerm)
            .then((result) => {
                let tmp = [];
                result.data.players.forEach(element => {
                    if (element.position !== null && element.team !== null){
                        tmp.push({
                            'id': element.player_id,
                            'label': element.full_name,
                            'subTitle': element.position + ' - ' + element.team
                        })
                    }
                })
                
                setOptions(tmp);
            }).catch((err) => {
                console.error(err);
            });
        }
    }, [debouncedSearchTerm]);

    return (
        <IconSettings iconPath="/icons">
            <div className="slds-p-around_small">
                <Card heading="" className="slds-p-horizontal_small slds-p-bottom_xx-small" style={{ backgroundColor: '#f3f3f3'}}>
                    <div className="slds-text-title_caps">ENTER PLAYER NAME</div>
                    <Combobox
                        id="combobox-inline-single"
                        hasStaticAlignment
                        menuPosition="relative"
                        variant="inline-listbox"
                        value={searchTerm}
                        events={{
                            onChange: onChange,
                            onRequestRemoveSelectedOption: onRemove,
                            onSubmit: onSubmit,
                            onSelect: onSelect,
                        }}
                        selection={selection}
                        options={comboboxFilterAndLimit({
                            inputValue: searchTerm,
                            options: options.map((elem) => ({
                            ...elem,
                            ...{
                                icon: (
                                    <Icon
                                        category="standard"
                                        name="avatar_loading"
                                        size="small"
                                    />
                                ),
                            },
                            })),
                            selection: selection,
                        })}
                    />
                </Card>

                {playerData.length > 0 ? (
                    <Card heading={playerInfo.full_name} className="slds-p-around_xx-small">
                        <div className="">
                            <div className="slds-grid slds-text-title_caps slds-p-around_small">
                                <div className="slds-size_1-of-2">
                                    <div><strong>Positon:</strong> {playerInfo.position}</div>
                                    <div><strong>Team:</strong> {playerInfo.team}</div>
                                    <div><strong>Experience:</strong> {playerInfo.years_exp} Seasons</div>
                                </div>
                                <div className="slds-size_1-of-2">
                                    <div><strong>Age:</strong> {playerInfo.age}</div>
                                    <div><strong>College:</strong> {playerInfo.college}</div>
                                </div>
                            </div>

                            <DataTable 
                                items={playerData} 
                                fixedHeader 
                                fixedLayout 
                                striped
                                style={{
                                    fontSize: '10px'
                                }}
                            >
                                <DataTableColumn label="Week" primaryColumn property="Week" />
                                <DataTableColumn label="Opponent" property="Opponent" />
                                {/** might need to calcuulate manually */}
                                <DataTableColumn label="Points" property="FantasyPoints" />
                                <DataTableColumn label="Comp" property="PassingCompletions" ><CustomDataTableCell /></DataTableColumn>
                                <DataTableColumn label="Att" property="PassingAttempts" ><CustomDataTableCell /></DataTableColumn>
                                {/** 
                                <DataTableColumn label="Comp %" property="PassingCompletionPercentage" ><CustomDataTableCell /></DataTableColumn>
                                */}
                                <DataTableColumn label="YDs" property="PassingYards" ><CustomDataTableCell /></DataTableColumn>
                                <DataTableColumn label="TDs" property="PassingTouchdowns"><CustomDataTableCell /></DataTableColumn>  
                                <DataTableColumn label="Int" property="Interceptions"><CustomDataTableCell /></DataTableColumn>
                                <DataTableColumn label="Fum" property="Fumbles" ><CustomDataTableCell /></DataTableColumn>
                            </DataTable>
                        </div>
                    </Card>
                ) : null}
            </div>
        </IconSettings>
    );

    
}



const mapStateToProps = (state) => ({

});

const mapDispatchToProps = (dispatch) => ({});

export default connect(mapStateToProps, mapDispatchToProps)(PlayerComparison);