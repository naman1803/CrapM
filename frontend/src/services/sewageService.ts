// frontend/src/services/locationService.ts
import { Axios } from '@shared-components/Axios';
import {
  SewageData,
  SewageCoordData,
  SewageSeverityData,
} from '@type/SewageData';
import { ApiResponse } from '@type/Response';

// Function to fetch location data
export const fetchSewageData = async (): Promise<ApiResponse<SewageData[]>> => {
  try {
    const response = await Axios.get('/data/sewage/all');
    return response;
  } catch (error) {
    console.error('Error fetching sewage data', error);
    throw error;
  }
};

export const fetchSelectedSewageData = async (
  id: number,
): Promise<ApiResponse<SewageData>> => {
  try {
    const response = await Axios.get(`/data/sewage/get/${id}`);
    return response;
  } catch (error) {
    console.error('Error fetching sewage data by id');
    throw error;
  }
};

export const fetchSewageCoordData = async (): Promise<
  ApiResponse<SewageCoordData[]>
> => {
  try {
    const response = await Axios.get('/maps/sewage/all');
    return response;
  } catch (error) {
    console.error('Error fetching sewage map data', error);
    throw error;
  }
};

export const fetchSewageSeverityData = async (
  id: number,
): Promise<ApiResponse<SewageSeverityData>> => {
  try {
    const response = await Axios.get(`/data/sewage/severity/${id}`);
    return response;
  } catch (error) {
    console.error('Error fetching sewage severity data', error);
    throw error;
  }
};
