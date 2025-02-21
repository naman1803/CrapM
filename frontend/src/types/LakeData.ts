import { ApiData } from './Response';

export interface LakeData extends ApiData {
  id: number;
  lakeName: string;
  latitude: number;
  longitude: number;
  additionalNotes?: string | null;
}
