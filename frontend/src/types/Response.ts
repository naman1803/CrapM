//all response data related to general api requests
export interface ResponseData {
  status: number;
}
//format of data returned from the api
export type ApiData = object;

//format of api response
export interface ApiResponse<T extends ApiData> extends ResponseData {
  data: T;
}
