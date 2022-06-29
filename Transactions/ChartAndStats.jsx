import { connect } from 'react-redux';
import React, { useEffect } from 'react';
import Axios from 'axios';
import { BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, ReferenceLine, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const ChartAndStats = (props) => { 
  const [addedStats, setAddedStats] = React.useState({});
  const [droppedStats, setDroppedStats] = React.useState({});
  const [dataPoints, setDataPoints] = React.useState([]);

  useEffect(() => {
    if (props.show) {
      showTransactionData();
    }
  }, [props.show]);

  const calculateFantasyPoints = (playerData, added) => {
    let weeklyData = new Array(17);

    let lastWeek = 1;
    for (let i = 0; i < playerData.length; i++) {
      if (playerData[i].Position === 'DEF') {
        console.log("Defense");
      } else if (playerData[i].Position === 'K') {
        console.log("Kicker");
      } else if (
        playerData[i].Position === 'QB' || 
        playerData[i].Position === 'RB' ||
        playerData[i].Position === 'WR' ||
        playerData[i].Position === 'TE'
      ) {
        if ((lastWeek + 1) < playerData[i].Week) {
          for (let j = 0; j < (playerData[i].Week - (lastWeek + 1)); j++) {
            weeklyData.push(0);
          }
        }

        let points = 
          (parseFloat(playerData[i].PassingTouchdowns) * props.scoringSettings.pass_td) +
          (parseFloat(playerData[i].PassingYards) * props.scoringSettings.pass_yd) +
          (parseFloat(playerData[i].PassingInterceptions) * props.scoringSettings.pass_int) +
          (parseFloat(playerData[i].ReceivingTouchdowns) * props.scoringSettings.rec_td) +
          (parseFloat(playerData[i].ReceivingYards) * props.scoringSettings.rec_yd) +
          (parseFloat(playerData[i].Receptions) * props.scoringSettings.rec) +
          (parseFloat(playerData[i].RushingTouchdowns) * props.scoringSettings.rush_td) +
          (parseFloat(playerData[i].RushingYards) * props.scoringSettings.rush_yd) +
          (parseFloat(playerData[i].Fumbles) * props.scoringSettings.fum) +
          (parseFloat(playerData[i].FumblesLost) * props.scoringSettings.fum_lost) +
          (parseFloat(playerData[i].Interceptions) * props.scoringSettings.int);

        if (added) {
          weeklyData[playerData[i].Week - 1] = { 
            'Week': playerData[i].Week,
            'Added': points.toFixed(2) 
          };
        } else {
          weeklyData[playerData[i].Week - 1] = { 
            'Week': playerData[i].Week,
            'Dropped': points.toFixed(2) 
          };
        }

        lastWeek = playerData[i].Week;
      } else {
        console.log("------" + playerData[i].Position);
      }
    }
    
    return weeklyData;
  }

  const showTransactionData = async () => {
    let body = {};
    let tmp1 = [], tmp2 = [], tmp3 = [];

    if (props.added !== undefined) 
        body['addedPlayerId'] = props.added.fantasy_data_id;
    if (props.dropped !== undefined) 
        body['droppedPlayerId'] = props.dropped.fantasy_data_id;

    let playerData = await Axios.post('/api/team/player-data', body); 

    if (playerData.data.addedPlayer !== undefined) {
      tmp1 = calculateFantasyPoints(playerData.data.addedPlayer, true);

      console.log(tmp1);
      /*
      setAddedStats({
        'Average': (tmp1.reduce((a,b) => parseFloat(a) + parseFloat(b), 0) / tmp1.length).toFixed(2),
        'Max': Math.max(...tmp1.Points),
        'Min': Math.min(...tmp1.Points5),
      })
      */
    }

    if (playerData.data.droppedPlayer !== undefined){
      tmp2 = calculateFantasyPoints(playerData.data.droppedPlayer, false);

      console.log(tmp2);
      /*
      setDroppedStats({
        'Average': (tmp2.reduce((a,b) => parseFloat(a) + parseFloat(b), 0) / tmp2.length).toFixed(2),
        'Max': Math.max(...tmp2.Points),
        'Min': Math.min(...tmp2.Points),
      })
      */
    }

    if (tmp1.length > 0 && tmp2.length > 0) {
      tmp3 = tmp1.concat(tmp2);
    } else if (tmp1.length > 0) {
      tmp3 = tmp1;
    } else if (tmp2.length > 0) {
      tmp3 = tmp2;
    }

    setDataPoints(tmp3);

    return;
  } 

  return (
    <div className="slds-grid">
      <div className="slds-col slds-size_1-of-1 slds-p-top_x-small slds-p-bottom_xx-small">
        <div style={props.show ? ({ display: 'block', height: '350px', width: '100%'}) : ({ display: 'none'})}>
          <div 
            className="slds-grid slds-p-vertical_x-small"
          >
            <div className="slds-size_1-of-2">
              <div className="slds-text-title_caps">
                {props.added !== undefined ? (
                  <div>
                    <div>Avg: {addedStats.Average}</div>
                    <div>Max: {addedStats.Max}</div>
                    <div>Min: {addedStats.Min}</div>
                  </div>
                ) : (null)}
              </div>
            </div>
            <div className="slds-size_1-of-2">
              <div className="slds-text-title_caps">
                {props.dropped !== undefined ? (
                  <div>
                    <div>Avg: {droppedStats.Average}</div>
                    <div>Max: {droppedStats.Max}</div>
                    <div>Min: {droppedStats.Min}</div>
                  </div>
                ) : (null)}
              </div>
            </div>
          </div>
          <ResponsiveContainer width="100%" height="85%">
            <BarChart
              width={500}
              height={300}
              data={dataPoints}
              margin={{
                top: 1,
                right: 5,
                left: 5,
                bottom: 5,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="Week" />
              <YAxis domain={[0, 'dataMax']} />
              <Tooltip />
              <Legend />
              <ReferenceLine y={0} stroke="#000" />
              <Bar dataKey="Added" fill="#8884d8" />
              <Bar dataKey="Dropped" fill="#82ca9d" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  )
};

const mapStateToProps = (state) => ({
  scoringSettings: state.league.scoringSettings,
});

const mapDispatchToProps = (dispatch) => ({});

export default connect(mapStateToProps, mapDispatchToProps)(ChartAndStats);