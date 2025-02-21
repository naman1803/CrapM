import { useLocation } from 'react-router-dom';
/**test component which displays the current url location.
 * use testid = location-display to get value of current location
 */
const LocationDisplay: React.FC = () => {
  const location = useLocation();

  return <div data-testid='location-display'>{location.pathname}</div>;
};
export default LocationDisplay;
