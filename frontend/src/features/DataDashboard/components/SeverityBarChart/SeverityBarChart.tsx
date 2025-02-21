import React from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Label,
  Cell,
} from 'recharts';
import { SeverityData } from '../../types/ChartData';
import ChartToolTip from '../ChartToolTip/ChartToolTip';

export interface SeverityBarProps {
  data: SeverityData[];
}

/**
 * A Bar Chart which displays lake severity
 */
const SeverityBarChart: React.FC<SeverityBarProps> = ({ data }) => {
  // get color code for severity bar based on severity level
  const getSeverityColor = (severityLevel: string) => {
    switch (severityLevel) {
      case 'Low':
        return '#93c47d'; // green
      case 'Moderate':
        return '#ffd966'; // yellow
      case 'High':
        return '#f6b26b'; // orange
      case 'Critical':
      default:
        return '#e06666'; // red
    }
  };

  return (
    <ResponsiveContainer width='100%' height='100%' minHeight={'400px'}>
      <BarChart
        data={data}
        margin={{
          top: 5,
          right: 30,
          left: 20,
          bottom: 5,
        }}
      >
        <CartesianGrid vertical={false} strokeDasharray='3 3' />
        <XAxis dataKey='facilityOwner'>
          <Label
            style={{
              textAnchor: 'middle',
              fontSize: '130%',
              fill: 'white',
            }}
            dy={40}
          />
        </XAxis>
        <YAxis>
          <Label
            style={{
              textAnchor: 'middle',
              fontSize: '130%',
              fill: 'white',
            }}
            angle={270}
            value={'Severity Score'}
            dx={-30}
          />
        </YAxis>
        <Tooltip
          content={
            <ChartToolTip
              labels={{
                facilityOwner: "Company",
                severityScore: "Severity Score"
              }}
            />
          }
        />
        <Bar dataKey='severityScore'>
          {data.map((bar) => (
            <Cell
              key={bar.severityScore}
              fill={getSeverityColor(bar.severityLevel)}
            />
          ))}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  );
};
export default SeverityBarChart;
