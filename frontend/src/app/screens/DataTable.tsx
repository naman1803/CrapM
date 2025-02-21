// DataTable.tsx
import SewageTable from '@shared-components/SewageTable/SewageTable';
import { Box } from '@mui/material';
import useAsyncResponse from '@hooks/useAsyncResponse'; // Import the useAsyncResponse hook
import { SewageData } from '@type/SewageData';
import React, { useEffect } from 'react';
import { fetchSewageData } from '@services/sewageService'; // Import the sewage service

const DataTable = () => {
  const [sewageData, setSewageData] = React.useState<SewageData[]>([]);

  const onSuccess = (data: SewageData[]) => {
    if (!data || data.length === 0) {
      return;
    }
    setSewageData(data);
  };

  const onError = (error: any) => {
    console.error('Failed to fetch sewage data', error);
  };

  const {
    callAsyncFunction: fetchData,
    isLoading,
    hasFetchedOnce,
  } = useAsyncResponse<SewageData[], []>({
    api: fetchSewageData,
    onSuccess,
    onError,
    initialLoadingState: false,
  });

  useEffect(() => {
    if (!hasFetchedOnce) {
      fetchData();
    }
  }, [fetchData, isLoading, hasFetchedOnce]);

  return (
    <Box width={"100%"} sx={{ marginTop: '1rem' }}>
      <SewageTable sewageData={sewageData} isLoading={isLoading} />
    </Box>
  );
};

export default DataTable;
