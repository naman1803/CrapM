import { Grid2, Typography } from '@mui/material';
import { useOutletContext } from 'react-router-dom';
import { ViewContextProps } from './View';
import { SewageInfoCard } from '@/shared-components/SewageInfoCard';
import { fetchSewageSeverityData } from '@services/sewageService';
import { useEffect, useState } from 'react';
import useAsyncResponse from '@hooks/useAsyncResponse';
import {
  Contaminants,
  SewageSeverityData,
} from '@/types/SewageData';
import { DashBoard } from '@/features/DataDashboard';
import SeverityOverTimeChart from '@/features/DataDashboard/components/SeverityOverTimeChart/SeverityOverTimeChart';
import ChartFrame from '@/features/DataDashboard/components/ChartFrame/ChartFrame';
// import { processSewageData } from '@/features/MapDisplay/utils'; --implement
/**
 * the view when a sewage producer is selected
 * @returns
 */
const ViewSewage: React.FC = () => {
  const {
    selectedElement,
    isLoading: isViewLoading,
    handleSelect,
  } = useOutletContext<ViewContextProps>();
  const [contaminant, setContaminant] = useState<Contaminants | undefined>(
    undefined,
  );

  const onSuccess = (data: SewageSeverityData) => {
    // const procSewageData = processSewageData(data);
    const contaminant = data.contaminants;
    setContaminant(contaminant);
  };

  const onError = () => {
    setContaminant(undefined);
  };

  const {
    callAsyncFunction: fetchSelectedData,
    isLoading,
    hasFetchedOnce,
  } = useAsyncResponse<SewageSeverityData, [number]>(
    {
      api: fetchSewageSeverityData,
      onSuccess,
      onError,
      initialLoadingState: false, // Set to true if you want the loading state initially active
    },
    [selectedElement],
  );

  useEffect(() => {
    if (!isLoading && !hasFetchedOnce && selectedElement) {
      fetchSelectedData(selectedElement.id); // Call the API
    }
  }, [fetchSelectedData, isLoading, hasFetchedOnce, selectedElement]);

  useEffect(() => {
    setContaminant(undefined);
  }, [selectedElement]);

  //fetch by sewageId to get info
  //check if the id is valid
  if (isViewLoading) {
    return <Grid2 size={{ xs: 12, md: 'grow' }}>Loading... </Grid2>;
  }
  if (!selectedElement) {
    return (
      <Grid2 size={{ xs: 12, md: 'grow' }}>Sewage producer not found</Grid2>
    );
  }

  const severityScoreColour = (severityScore: number) => {
    if (severityScore < 1) return 'green';
    if (severityScore < 2) return 'yellow';
    return 'red';
  };

  return (
    <>
      <Grid2 size={{ xs: 12, md: 'grow' }}>
        <SewageInfoCard
          sewage={selectedElement}
          handleClose={() => handleSelect()}
        >
          {!hasFetchedOnce && (
            <Grid2 size={{ xs: 12, md: 12 }}>Loading Data...</Grid2>
          )}
          {hasFetchedOnce &&
            (contaminant ? (
              <Grid2 container spacing={2}>
                {Object.entries(contaminant || ({} as Contaminants)).map(
                  ([contaminant, value]) => {
                    const {
                      averageSeverityScore,
                      overallSeverityLevel,
                      averagePercentExceedance,
                    } = value;
                    return (
                      <Grid2 key={contaminant + "card_info"} sx={{
                        border: 1,
                        borderColor: '#3a3a3a',
                        borderRadius: 1,
                        padding: '0.5rem'
                      }}>
                        <Typography variant='h6'>{contaminant}</Typography>
                        <Typography>
                          Severity Score:{' '}
                          <Typography
                            component={'span'}
                            color={severityScoreColour(averageSeverityScore)}
                          >
                            {averageSeverityScore}
                          </Typography>
                        </Typography>
                        <Typography>
                          Severity Level: {overallSeverityLevel}
                        </Typography>
                        <Typography>
                          Percent Exceedance: {averagePercentExceedance}%
                        </Typography>
                      </Grid2>
                    );
                  },
                )}
              </Grid2>
            ) : (
              <Grid2 size={{ xs: 12, md: 12 }}>
                Error fetching contaminant data...
              </Grid2>
            ))}
        </SewageInfoCard>
      </Grid2>

      <Grid2 size={{ xs: 12, md: 12 }}>
        <Grid2
          width='100%'
          sx={{
            backgroundColor: 'rgba(0, 0, 0, 0.75)',
            border: '1px solid white',
            borderRadius: '8px',
          }}
          container
          padding='1rem'
          spacing={3}
        >
          {!hasFetchedOnce && (
            <Grid2 size={{ xs: 12, md: 12 }}>Loading Data...</Grid2>
          )}

          {hasFetchedOnce &&
            (contaminant ? (
              <Grid2 container spacing={2} columns={12}>
                <DashBoard title='Analytics Overview'>
                  <ChartFrame size={"row"}>
                    <SeverityOverTimeChart data={contaminant} />
                  </ChartFrame>
                </DashBoard>
              </Grid2>
            ) : (
              <Grid2 size={{ xs: 12, md: 12 }}>
                Error fetching contaminant data...
              </Grid2>
            ))}
        </Grid2>
      </Grid2>
    </>
  );
};
export default ViewSewage;
