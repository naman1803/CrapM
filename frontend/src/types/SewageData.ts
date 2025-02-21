import { ApiData } from './Response';

export interface SewageData extends ApiData {
  id: number;
  facilityOwner: string;
  siteAddress: string;
  contaminant: string;
  typeOfExceedance: string;
  exceedanceStartDate: string;
  exceedanceEndDate: string;
  contaminantLimit: number;
  contaminantUnit: string;
  limitFrequency: string;
  noOfExceedances: number;
  quantityMaximum: number;
  quantityMinimum: number | null;
}

export interface SewageCoordData extends ApiData {
  id: number;
  facilityOwner: string;
  latitude: number;
  longitude: number;
  contaminants?: string;
  radius: number;
  colour: string;
}

export interface SewageSeverityData extends ApiData {
  id: number;
  facilityOwner: string;
  contaminants: Contaminants;
}

export interface Contaminants {
  [key: string]: {
    averageSeverityScore: number;
    overallSeverityLevel: string;
    averagePercentExceedance: number;
    records: ContaminantRecord[];
  };
}

interface ContaminantRecord {
  date: string;
  severityScore: number;
  severityLevel: string;
}

export interface ContaminantSeverityData extends ApiData {
  id: number;
  facilityOwner: string;
  contaminant: string;
  exceedanceStart: string;
  exceedanceEnd: string;
  severityScore: number;
  severityLevel: string;
}
