import {
  fetchSewageData,
  fetchSelectedSewageData,
  fetchSewageCoordData,
  fetchSewageSeverityData,
} from '@services/sewageService';
import {
  SewageData,
  SewageCoordData,
  SewageSeverityData,
} from '@type/SewageData';
import { Axios } from '@shared-components/Axios';

jest.mock('@shared-components/Axios');

const mockedAxios = Axios as jest.Mocked<typeof Axios>;

const mockSewageData: SewageData[] = [
  {
    id: 1,
    facilityOwner: 'SewageOwner',
    siteAddress: 'address',
    contaminant: 'contaminant',
    typeOfExceedance: 'some_type',
    exceedanceStartDate: 'start_date',
    exceedanceEndDate: 'end_date',
    contaminantLimit: 6,
    contaminantUnit: 'unit',
    limitFrequency: 'freq',
    noOfExceedances: 4,
    quantityMaximum: 3,
    quantityMinimum: 1,
  },
];

const mockSelectedSewageData: SewageData = {
  id: 1,
  facilityOwner: 'SewageOwner',
  siteAddress: 'address',
  contaminant: 'contaminant',
  typeOfExceedance: 'some_type',
  exceedanceStartDate: 'start_date',
  exceedanceEndDate: 'end_date',
  contaminantLimit: 6,
  contaminantUnit: 'unit',
  limitFrequency: 'freq',
  noOfExceedances: 4,
  quantityMaximum: 3,
  quantityMinimum: 1,
};

const mockCoordData: SewageCoordData[] = [
  {
    id: 1,
    facilityOwner: 'SewageOwner',
    latitude: 0,
    longitude: 0,
    contaminants: 'contaminant',
    radius: 20,
    colour: 'Red',
  },
];

const mockSeverityData: SewageSeverityData = {
  id: 1,
  facilityOwner: 'SewageOwner',
  contaminants: {
    name: {
      averageSeverityScore: 1.0,
      overallSeverityLevel: 'Medium',
      averagePercentExceedance: 1,
      records: [
        {
          date: '2021-01-01',
          severityScore: 1.0,
          severityLevel: 'Medium',
        },
      ],
    },
  },
};

describe('fetchSewageData', () => {
  it('fetches selected sewage data successfully', async () => {
    const data = { resp: mockSewageData };
    mockedAxios.get.mockImplementationOnce(() => Promise.resolve(data));
    await expect(fetchSewageData()).resolves.toEqual(data);
  });
  it('fails to fetch selected sewage data properly', async () => {
    const errorMessage = 'Error fetching sewage data';
    mockedAxios.get.mockImplementationOnce(() =>
      Promise.reject(new Error(errorMessage)),
    );
    await expect(fetchSewageData()).rejects.toThrow(errorMessage);
  });
});

describe('fetchSelectedSewageData', () => {
  it('fetches selected sewage data successfully', async () => {
    const data = { resp: mockSelectedSewageData };
    mockedAxios.get.mockImplementationOnce(() => Promise.resolve(data));
    await expect(fetchSelectedSewageData(1)).resolves.toEqual(data);
  });
  it('fails to fetch selected sewage data properly', async () => {
    const errorMessage = 'Error fetching sewage data by id';
    mockedAxios.get.mockImplementationOnce(() =>
      Promise.reject(new Error(errorMessage)),
    );
    await expect(fetchSelectedSewageData(1)).rejects.toThrow(errorMessage);
  });
});

describe('fetchSewageCoordData', () => {
  it('fetches coord data successfully', async () => {
    const data = { resp: mockCoordData };
    mockedAxios.get.mockImplementationOnce(() => Promise.resolve(data));
    await expect(fetchSewageCoordData()).resolves.toEqual(data);
  });
  it('fails to fetch coord data properly', async () => {
    const errorMessage = 'Error fetching sewage map data';
    mockedAxios.get.mockImplementationOnce(() =>
      Promise.reject(new Error(errorMessage)),
    );
    await expect(fetchSewageCoordData()).rejects.toThrow(errorMessage);
  });
});

describe('fetchSewageSeverityData', () => {
  it('fetches severity data successfully', async () => {
    const data = { resp: mockSeverityData };
    mockedAxios.get.mockImplementationOnce(() => Promise.resolve(data));
    await expect(fetchSewageSeverityData(1)).resolves.toEqual(data);
  });
  it('fails to fetch severity data properly', async () => {
    const errorMessage = 'Error fetching sewage severity data';
    mockedAxios.get.mockImplementationOnce(() =>
      Promise.reject(new Error(errorMessage)),
    );
    await expect(fetchSewageSeverityData(1)).rejects.toThrow(errorMessage);
  });
});
