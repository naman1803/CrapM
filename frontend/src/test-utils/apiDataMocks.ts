import { LakeData } from '@/types/LakeData';
import {
  SewageCoordData,
  SewageData,
  SewageSeverityData,
} from '@/types/SewageData';

export const mockSewageSeverityElement: SewageSeverityData = {
  id: 1,
  facilityOwner: 'Eric',
  contaminants: {
    brainrot: {
      averageSeverityScore: 1.0,
      overallSeverityLevel: 'Moderate',
      averagePercentExceedance: 100.0,
      records: [
        {
          severityScore: 1.0,
          severityLevel: 'Moderate',
          date: '2021-01-01',
        },
        {
          severityScore: 2.0,
          severityLevel: 'High',
          date: '2021-01-02',
        },
      ],
    },
    takingDumb: {
      averageSeverityScore: 2.0,
      overallSeverityLevel: 'High',
      averagePercentExceedance: 200.0,
      records: [
        {
          severityScore: 0.5,
          severityLevel: 'High',
          date: '2021-01-01',
        },
        {
          severityScore: 2.0,
          severityLevel: 'High',
          date: '2021-01-02',
        },
      ],
    },
  },
};

export const mockLakeApiData: LakeData[] = [
  {
    id: 1,
    lakeName: 'Lake Ontario',
    latitude: 45.2,
    longitude: -78.94,
    additionalNotes: null,
  },
  {
    id: 2,
    lakeName: 'Lake Erie',
    latitude: 46.47,
    longitude: -82.78,
    additionalNotes: null,
  },
];

export const mockSewageApiDataSent = [
  {
    id: 1,
    facilityOwner: 'Mock Facility 1',
    latitude: 44.49,
    longitude: -77.69,
    contaminant: 'BIOCHEMICAL OXYGEN DEMAND',
    radius: 22.539892,
    colour: "Green"
  },
  {
    id: 2,
    facilityOwner: 'Mock Facility 2',
    latitude: 44.68,
    longitude: -79.23,
    contaminant: 'PH - HIGH',
    radius: 22.524761,
    colour: "Green"
  },
];
export const mockSewageApiData: SewageCoordData[] = [
  {
    id: 1,
    facilityOwner: 'Mock Facility 1',
    latitude: 44.49,
    longitude: -77.69,
    radius: 22.539892,
    colour: "Green"
  },
  {
    id: 2,
    facilityOwner: 'Mock Facility 2',
    latitude: 44.68,
    longitude: -79.23,
    radius: 22.524761,
    colour: "Green"
  },
];

export const mockSewageSeverityApiData: SewageSeverityData[] = [
  {
    id: 1,
    facilityOwner: 'Mock Facility 1',
    contaminants: {
      'BIOCHEMICAL OXYGEN DEMAND': {
        averageSeverityScore: 0.77,
        overallSeverityLevel: 'Low',
        averagePercentExceedance: 177.0,
        records: [
          {
            severityScore: 0.77,
            severityLevel: 'Low',
            date: '2016-08-18',
          },
        ],
      },
    },
  },
  {
    id: 2,
    facilityOwner: 'Mock Facility 2',
    contaminants: {
      'PH - HIGH': {
        averageSeverityScore: 0.95,
        overallSeverityLevel: 'Low',
        averagePercentExceedance: 195.4,
        records: [
          {
            severityScore: 0.95,
            severityLevel: 'Low',
            date: '2016-08-30',
          },
        ],
      },
      'BIOCHEMICAL OXYGEN DEMAND': {
        averageSeverityScore: 0.58,
        overallSeverityLevel: 'Low',
        averagePercentExceedance: 157.8,
        records: [
          {
            severityScore: 0.58,
            severityLevel: 'Low',
            date: '2016-08-23',
          },
        ],
      },
    },
  },
];

export const mockSewageAllApiData: SewageData[] = [
  {
    id: 1,
    facilityOwner: 'Mock Facility 1',
    siteAddress: '123 Mock St',
    contaminant: 'BIOCHEMICAL OXYGEN DEMAND',
    typeOfExceedance: 'Legislation Non-Compliance',
    exceedanceStartDate: '2016-08-18T00:00:00',
    exceedanceEndDate: '2016-08-18T00:00:00',
    contaminantLimit: 50.0,
    contaminantUnit: 'mg/L',
    limitFrequency: 'any',
    noOfExceedances: 1,
    quantityMaximum: 88.5,
    quantityMinimum: null,
  },
  {
    id: 2,
    facilityOwner: 'Mock Facility 2',
    siteAddress: '1234 Mock St',
    contaminant: 'BIOCHEMICAL OXYGEN DEMAND',
    typeOfExceedance: 'Legislation Non-Compliance',
    exceedanceStartDate: '2016-08-23T00:00:00',
    exceedanceEndDate: '2016-08-23T00:00:00',
    contaminantLimit: 50.0,
    contaminantUnit: 'mg/L',
    limitFrequency: 'any',
    noOfExceedances: 1,
    quantityMaximum: 78.9,
    quantityMinimum: null,
  },
  {
    id: 3,
    facilityOwner: 'Mock Facility 2',
    siteAddress: '1234 Mock St',
    contaminant: 'PH - HIGH',
    typeOfExceedance: 'Legislation Non-Compliance',
    exceedanceStartDate: '2016-08-30T00:00:00',
    exceedanceEndDate: '2016-08-30T00:00:00',
    contaminantLimit: 50.0,
    contaminantUnit: 'mg/L',
    limitFrequency: 'any',
    noOfExceedances: 1,
    quantityMaximum: 97.7,
    quantityMinimum: null,
  },
];
