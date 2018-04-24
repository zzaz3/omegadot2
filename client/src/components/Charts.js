import React from 'react';
import RecordTransactions from './Transactions/RecTrans' 
import Basic from './BasicAttachment';
import { Card, CardImg, CardText,
  CardTitle, CardSubtitle, Button,CardColumns,Container } from 'reactstrap';
import {PieChart, Pie, Legend, Label, Tooltip} from 'recharts';

const RADIAN = Math.PI / 180;                    
const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, name, index }) => {
 	const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x  = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy  + radius * Math.sin(-midAngle * RADIAN);
 
  return (
    <text x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} 	dominantBaseline="central">
    	{name}
    </text>
  );
};

class Charts extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      turnoverAssetData: [],
      turnoverColor: '',
      assetData: [],
      assetColor: '',
      currentRatioData: [],
      currentRatioColor: '',
      quickRatioData: [],
      quickRatioColor: '',
      loggedIn: false
    };
  }

  componentDidMount() {
    // Get data.

    // Calculate Asset Turnover Stuff
    var salesValue = 500;
    var assetsValue = 100;
    var newTunoverAssetData = [{name: 'Sales', value: salesValue},
    {name: 'Assets', value: assetsValue}]; 
    var newTurnoverColor;
    if((salesValue/assetsValue) > .7){
      newTurnoverColor = '#417B3E';
    } else if(((salesValue/assetsValue) < .3)) {
      newTurnoverColor = '#ff0000';
    } else {
      newTurnoverColor = '#00ff00';
    }

    this.setState({
      turnoverAssetData: newTunoverAssetData,
      turnoverColor: newTurnoverColor
    });
  }
  
  render() {
    return (
      <div>
        <h1>Dashboard</h1>
        
        <CardColumns>
        <Card>
          <CardTitle>Turnover Assets</CardTitle>
          <PieChart width={800} height={400}>
            <Pie startAngle={180} endAngle={0} data={this.state.turnoverAssetData} cx={220} cy={200} outerRadius={200} fill={this.state.turnoverColor} labelLine={false} label={renderCustomizedLabel}/>
            <Tooltip />
          </PieChart>
        </Card>
        <Card>
          <CardTitle>Assets</CardTitle>
          <PieChart width={800} height={400}>
            <Pie startAngle={180} endAngle={0} data={this.state.turnoverAssetData} cx={220} cy={200} outerRadius={200} fill={this.state.turnoverColor} labelLine={false} label={renderCustomizedLabel}/>
            <Tooltip />
          </PieChart>
        </Card>
        </CardColumns>
        <CardColumns>
        <Card>
          <CardTitle>Current Ratio</CardTitle>
          <PieChart width={800} height={400}>
            <Pie startAngle={180} endAngle={0} data={this.state.turnoverAssetData} cx={220} cy={200} outerRadius={200} fill={this.state.turnoverColor} labelLine={false} label={renderCustomizedLabel}/>
            <Tooltip />
          </PieChart>
        </Card>
        <Card>
          <CardTitle>Quick Ratio</CardTitle>
          <PieChart width={800} height={400}>
            <Pie startAngle={180} endAngle={0} data={this.state.turnoverAssetData} cx={220} cy={200} outerRadius={200} fill={this.state.turnoverColor} labelLine={false} label={renderCustomizedLabel}/>
            <Tooltip />
          </PieChart>
        </Card>
        </CardColumns>
       </div>
    )
  }
}

export default Charts;
