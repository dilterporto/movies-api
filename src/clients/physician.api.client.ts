import { AddSingleton } from '../core/ioc';
import { IResponse, HttpError, HttpNotFountError } from '../core/response';
import { PhysicianNotFoundError, PhysiciansServicesNotAvailableError } from './errors';
import ApiClient from '../core/api.client';

export interface PhysicianResource {
  id: number;
  fullName: string;
  crm: string;
}

@AddSingleton(PhysicianApiClient)
export default class PhysicianApiClient {
  private client: ApiClient;
  constructor () {
    this.client = new ApiClient('physician');
  }

  public async getById (id: number): Promise<PhysicianResource | PhysicianNotFoundError | PhysiciansServicesNotAvailableError> {
    const response = await this.client.get<PhysicianResource>(`/physicians/${id}`);
    if (!(response instanceof HttpError && response instanceof HttpNotFountError)) {
      const { data } = (response as IResponse<PhysicianResource>);
      return data;
    }
    if (response instanceof HttpNotFountError) {
      return new PhysicianNotFoundError();
    }
    return new PhysiciansServicesNotAvailableError();
  }
}
