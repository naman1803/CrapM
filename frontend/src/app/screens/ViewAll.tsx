import { PointSelector } from '@/shared-components/PointSelector';
import { Grid2 } from '@mui/material';
import { useOutletContext } from 'react-router-dom';
import { ViewContextProps } from './View';
/**
 * Display the default view with nothing selected
 * @returns
 */
const ViewAll: React.FC = () => {
  const { sewage, lakes, handleSelect, handleHover } = useOutletContext<ViewContextProps>();



  return (
    <Grid2 size={{ xs: 12, md: 'grow' }}>
      <Grid2 container spacing={1}>
        <PointSelector
          type="lake"
          points={lakes}
          onHoverPoint={handleHover}
          onListElementClick={handleSelect}
        />
        <PointSelector
          type="sewage"
          points={sewage}
          onHoverPoint={handleHover}
          onListElementClick={handleSelect}
        />
      </Grid2>
    </Grid2>
  );
};
export default ViewAll;
