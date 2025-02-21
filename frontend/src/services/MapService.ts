// frontend/src/services/locationService.ts
import { LakeData } from '@type/LakeData';
import { ApiResponse } from '@type/Response';
import { Axios } from '@shared-components/Axios';

// Function to fetch location data
export const fetchMapData = async (): Promise<ApiResponse<LakeData[]>> => {
  try {
    const response = await Axios.get('/maps/lakes/all');
    // console.log('Real response:', response);

    return response;
  } catch (error) {
    console.error('Error fetching map data', error);
    throw error;
  }
};
