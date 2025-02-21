import React, { useState } from 'react';
import {
    Box,
    Collapse,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Typography,
} from '@mui/material';
import { FacilityExceedanceData } from '../../types/ChartData';
import { ResponsiveContainer } from 'recharts';

export interface RankingChartProps {
    data: FacilityExceedanceData[];
    children: React.ReactNode;
}

export function sortRankExceedanceElements(
    exceedanceData: FacilityExceedanceData[],
): FacilityExceedanceData[] {
    const uniqueExceedances: Record<string, number> = {};

    // compile all exceedances by facility owner name
    exceedanceData.forEach(({ facilityOwner, noOfExceedances }) => {
        if (uniqueExceedances[facilityOwner]) {
            uniqueExceedances[facilityOwner] += noOfExceedances;
        } else {
            uniqueExceedances[facilityOwner] = noOfExceedances;
        }
    });

    // compile unique set
    const elements: FacilityExceedanceData[] = Object.entries(uniqueExceedances).map(
        ([facilityOwner, noOfExceedances]) => ({ facilityOwner, noOfExceedances })
    );

    // sort by exceedance numbers
    elements.sort((a, b) => b.noOfExceedances - a.noOfExceedances);

    return elements;
}

const RankingChart: React.FC<RankingChartProps> = ({ data, children }) => {
    const [openRow, setOpenRow] = useState<number | null>(null);

    // sort data into rankings
    const uniqueData = sortRankExceedanceElements(data);

    // handler for opening detail boxes
    const handleRowClick = (index: number) => {
        setOpenRow(openRow === index ? null : index);
    };

    return (
        <ResponsiveContainer width="100%" height="100%" minHeight={'400px'}>
            <Box>
                {children}
                <TableContainer component={Box} sx={{ maxHeight: 400, overflow: 'auto' }}>
                    <Table stickyHeader aria-label="collapsible table">
                        <TableHead>
                            <TableRow>
                                <TableCell>Rank</TableCell>
                                <TableCell>Facility Owner</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {uniqueData.map((element, index) => (
                                <React.Fragment key={element.facilityOwner}>
                                    <TableRow
                                        hover
                                        onClick={() => handleRowClick(index)}
                                    >
                                        <TableCell>{index + 1}</TableCell>
                                        <TableCell>{element.facilityOwner}</TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell colSpan={2} sx={{ p: 0 }}>
                                            <Collapse in={openRow === index} timeout="auto" unmountOnExit>
                                                <Box padding={'0.5rem'}>
                                                    <Typography variant="h6">Rating Details</Typography>
                                                    <Typography variant="body2">
                                                        Number of Exceedances: {element.noOfExceedances}
                                                    </Typography>
                                                </Box>
                                            </Collapse>
                                        </TableCell>
                                    </TableRow>
                                </React.Fragment>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Box>
        </ResponsiveContainer>
    );
};

export default RankingChart;
