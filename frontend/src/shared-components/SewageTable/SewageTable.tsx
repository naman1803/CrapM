// SewageTable.tsx
import React from 'react';
import {
  Container,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material';
import { SewageData } from '@type/SewageData';

interface SewageTableProps {
  sewageData: SewageData[];
  isLoading: boolean;
}

export type { SewageTableProps };

const SewageTable: React.FC<SewageTableProps> = ({ sewageData, isLoading }) => {
  return (
    <Container>
      <Typography variant='h4' component='h1' gutterBottom>
        Industrial Sewage Data Overview
      </Typography>
      {isLoading ? (
        <Typography>Loading...</Typography>
      ) : (
        <TableContainer
          sx={{
            backgroundColor: 'rgba(0, 0, 0, 0.75)',
            border: '1px solid white',
            maxHeight: '83vh',
            overflowY: 'auto',
          }}
        >
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>ID</TableCell>
                <TableCell>Facility Owner</TableCell>
                <TableCell>Site Address</TableCell>
                <TableCell>Contaminant</TableCell>
                <TableCell>Type of Exceedance</TableCell>
                <TableCell>Exceedance Start Date</TableCell>
                <TableCell>Exceedance End Date</TableCell>
                <TableCell>Contaminant Limit</TableCell>
                <TableCell>Contaminant Unit</TableCell>
                <TableCell>Limit Frequency</TableCell>
                <TableCell>No. of Exceedances</TableCell>
                <TableCell>Quantity Maximum</TableCell>
                <TableCell>Quantity Minimum</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {sewageData.map((data) => (
                <TableRow key={data.id}>
                  <TableCell>{data.id}</TableCell>
                  <TableCell>{data.facilityOwner}</TableCell>
                  <TableCell>{data.siteAddress}</TableCell>
                  <TableCell>{data.contaminant}</TableCell>
                  <TableCell>{data.typeOfExceedance}</TableCell>
                  <TableCell>{data.exceedanceStartDate}</TableCell>
                  <TableCell>{data.exceedanceEndDate}</TableCell>
                  <TableCell>{data.contaminantLimit}</TableCell>
                  <TableCell>{data.contaminantUnit}</TableCell>
                  <TableCell>{data.limitFrequency}</TableCell>
                  <TableCell>{data.noOfExceedances}</TableCell>
                  <TableCell>{data.quantityMaximum}</TableCell>
                  <TableCell>{data.quantityMinimum}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </Container>
  );
};

export default SewageTable;
