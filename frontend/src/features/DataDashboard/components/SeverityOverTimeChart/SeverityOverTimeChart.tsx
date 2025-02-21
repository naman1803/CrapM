import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Label } from 'recharts';
import ChartToolTip from '../ChartToolTip/ChartToolTip';
import { Box, Tab, Tabs } from '@mui/material';
import SeverityDot from '../SeverityDot/SeverityDot';
import { Contaminants } from '@/types/SewageData';

export interface SeverityOverTimeProps {
    data: Contaminants;
}

interface GraphPanelProps {
    children?: React.ReactNode;
    index: number;
    value: number;
}

const GraphPanel: React.FC<GraphPanelProps> = ({ children, value, index }) => {
    return (
        <Box
            hidden={value !== index} // hide panel if not selected
            id={`contaminant-tabpanel-${index}`}
            aria-labelledby={`contaminant-tab-${index}`}
        >
            {value === index && (
                <Box>{children}</Box>
            )}
        </Box>
    );
}

const SeverityOverTimeChart: React.FC<SeverityOverTimeProps> = ({ data }) => {
    const [currentTab, setCurrentTab] = React.useState(0);

    // event var is needed for handle, ignoring
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const handleChange = (event: React.SyntheticEvent, newCurrentTab: number) => {
        setCurrentTab(newCurrentTab);
    };

    return (
        <Box>
            <Tabs value={currentTab} onChange={handleChange} aria-label="contaminants tab">
                {Object.entries(data).map(([keyName], index) => (
                    // create tab headers
                    <Tab
                        key={keyName}
                        label={keyName}
                        id={`contaminant-tab-${index}`}
                    />
                ))}
            </Tabs>
            {Object.entries(data).map(([keyName, values], index) => {
                // create tab panels
                return (
                    <GraphPanel key={keyName} value={currentTab} index={index}>
                        <ResponsiveContainer width="100%" height="100%" minHeight={"300px"}>
                            <LineChart
                                width={500}
                                height={300}
                                data={values.records}
                                margin={{
                                    top: 5,
                                    right: 30,
                                    left: 30,
                                    bottom: 5,
                                }}
                            >
                                <CartesianGrid vertical={false} horizontal={false} />
                                <XAxis
                                    dataKey="date"
                                    padding={{ left: 30, right: 30 }}
                                    domain={['dataMin', 'dataMax']}
                                />
                                <YAxis
                                    padding={{ top: 40, bottom: 40 }}
                                    dataKey="severityScore"
                                >
                                    <Label
                                        style={{
                                            textAnchor: "middle",
                                            fontSize: "130%",
                                            fill: "white",
                                        }}
                                        angle={270}
                                        value={'Severity Score'}
                                        dx={-40}
                                    />
                                </YAxis>
                                <Tooltip
                                    content={
                                        <ChartToolTip
                                            labels={{
                                                severityScore: "Severity Score",
                                                date: "Date"
                                            }}
                                        />
                                    }
                                />
                                <Line
                                    type="monotone"
                                    dataKey="severityScore"
                                    stroke="white"
                                    dot={({ cx, cy, payload }) => {
                                        const { severityLevel } = payload;
                                        return (
                                            <SeverityDot key={`${cx}_${cy}_${severityLevel}`} cx={cx} cy={cy} severityLevel={severityLevel} />
                                        );
                                    }}
                                />
                            </LineChart>
                        </ResponsiveContainer>
                    </GraphPanel>
                );
            })}
        </Box>
    );
};
export default React.memo(SeverityOverTimeChart);

