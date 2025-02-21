import { InfoCard } from '../InfoCard';
import { LakeGeoPoint, MapElement } from '@/features/MapDisplay/types/MapElements';
import { LatLngTuple } from 'leaflet';
export interface LakeInfoCardProps {
  lake: MapElement;
  handleClose: () => void;
}

/** An info card which displays information about a given lake*/
const LakeInfoCard: React.FC<LakeInfoCardProps> = ({ lake, handleClose }) => {
  const point: LakeGeoPoint = lake.dataPoint as LakeGeoPoint;
  const coords: LatLngTuple = point.coordinates as LatLngTuple;
  const infoItems = [
    `Latitude: ${coords[0]}`,
    `Longitude: ${coords[1]}`,
    ...(point.additional_notes
      ? [`Misc Information: ${point.additional_notes}`]
      : []),
  ];

  return (
    <InfoCard
      title={point.name}
      infoItems={infoItems}
      handleClose={handleClose}
    >
      <></>
    </InfoCard>
  );
};

export default LakeInfoCard;
