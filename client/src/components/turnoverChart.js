import React, { Component } from 'react';
import {PieChart, Pie, Legend, Label} from 'recharts';

var data = [{name: 'Sales', value: 500},
        {name: 'Assets', value: 100}];
var color = '#417B3E';

export default class turnoverChart extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      data: [{name: 'Sales', value: 500},
            {name: 'Assets', value: 100}],
      color: '#417B3E'
    };
  }
  render() {
  	return (
      <div>
    	<PieChart width={800} height={400}>
        <Pie startAngle={180} endAngle={0} data={this.state.data} cx={200} cy={200} outerRadius={80} fill={this.state.color} />
       </PieChart>
       </div>
    );
  }
};