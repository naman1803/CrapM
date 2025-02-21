import { http, HttpResponse } from 'msw';
import {
  mockLakeApiData,
  mockSewageAllApiData,
  mockSewageApiDataSent,
  mockSewageSeverityApiData,
} from './apiDataMocks';

const handlers = [
  http.get('/api/maps/lakes/all', () => {
    return HttpResponse.json(mockLakeApiData);
  }),
  http.get('/api/maps/sewage/all', () => {
    return HttpResponse.json(mockSewageApiDataSent);
  }),
  http.get('/api/data/sewage/all', () => {
    return HttpResponse.json(mockSewageAllApiData);
  }),
  ...mockSewageSeverityApiData.map((severityData) =>
    http.get(`/api/data/sewage/severity/${severityData.id}`, () => {
      return HttpResponse.json(severityData);
    }),
  ),
];
export default handlers;
