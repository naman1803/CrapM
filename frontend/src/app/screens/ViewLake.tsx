import { Grid2 } from '@mui/material';
import { useOutletContext } from 'react-router-dom';
import { ViewContextProps } from './View';
import { LakeInfoCard } from '@/shared-components/LakeInfoCard';
/**
 * The view when a lake is selected
 * @returns
 */
const ViewLake: React.FC = () => {
  const { selectedElement, isLoading, handleSelect } =
    useOutletContext<ViewContextProps>();

  if (isLoading) {
    return <Grid2 size={{ xs: 12, md: 'grow' }}>Loading... </Grid2>;
  }
  //check if the lake is actually valid
  if (!selectedElement) {
    return <Grid2 size={{ xs: 12, md: 'grow' }}>No lake found</Grid2>;
  }

  return (
    <Grid2 size={{ xs: 12, md: 'grow' }}>
      <LakeInfoCard lake={selectedElement} handleClose={() => handleSelect()} />
    </Grid2>
  );
};
export default ViewLake;
