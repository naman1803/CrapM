import { 
    fetchMapData
 } from '@services/MapService';
import { LakeData } from '@type/LakeData';
import { Axios } from '@shared-components/Axios';

jest.mock('@shared-components/Axios');

const mockedAxios = Axios as jest.Mocked<typeof Axios>;

const mockMapData: LakeData[] = [
    { 
      id: 1, lakeName: "cool_name", latitude: 0, longitude: 0, additionalNotes: "cool_note"
    },
  ];

describe('fetchMapData', () => {
    it('fetches selected sewage data successfully', async () => {
      const data = {resp: mockMapData};
      mockedAxios.get.mockImplementationOnce(() => Promise.resolve(data));
      await expect(fetchMapData()).resolves.toEqual(data);
    });
    it('fails to fetch selected sewage data properly', async () => {
      const errorMessage = "Error fetching map data";
      mockedAxios.get.mockImplementationOnce(() => Promise.reject(new Error(errorMessage)));
      await expect(fetchMapData()).rejects.toThrow(errorMessage);
    })
  });
  