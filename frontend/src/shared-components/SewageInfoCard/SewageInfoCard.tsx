import { InfoCard } from '../InfoCard';
import { SewageGeoPoint, MapElement } from '@/features/MapDisplay/types/MapElements';
import { LatLngTuple } from 'leaflet';

export interface SewageInfoCardProps {
  sewage: MapElement;
  handleClose: () => void;
  children: React.ReactNode;
}

/** An info card which displays information about a given sewage marker*/
const SewageInfoCard: React.FC<SewageInfoCardProps> = ({ sewage, handleClose, children }) => {
  const point: SewageGeoPoint = sewage.dataPoint as SewageGeoPoint;
  const coords: LatLngTuple = point.coordinates as LatLngTuple;
  const infoItems = [
    `Latitude: ${coords[0]}`,
    `Longitude: ${coords[1]}`,
  ];

  return (
    <InfoCard
      title={point.facility_owner}
      infoItems={infoItems}
      handleClose={handleClose}
    >
      {children}
    </InfoCard>
  );
};

export default SewageInfoCard;
