import { AddSingleton } from '../core/ioc';
import { IResponse, HttpError, HttpNotFountError } from '../core/response';
import ApiClient from '../core/api.client';

export interface ClinicResource {
  id: number;
  name: string;
}

@AddSingleton(ClinicApiClient)
export default class ClinicApiClient {
  private client: ApiClient;
  constructor () {
    this.client = new ApiClient('clinic');
  }

  public async getById (id: number): Promise<ClinicResource> {
    const response = await this.client.get<ClinicResource>(`/clinics/${id}`);
    if (!(response instanceof HttpError && response instanceof HttpNotFountError)) {
      const { data } = (response as IResponse<ClinicResource>);
      return data;
    }
  }
}
