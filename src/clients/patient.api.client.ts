import { AddSingleton } from '../core/ioc';
import { IResponse, HttpError, HttpNotFountError } from '../core/response';
import { PatientNotFoundError, PatientsServicesNotAvailableError } from './errors';
import ApiClient from '../core/api.client';

export interface PatientResource {
  id: number;
  fullName: string;
  email: string;
  phone: string;
  clinic: any;
  active: boolean;
}

@AddSingleton(PatientApiClient)
export default class PatientApiClient {
  private client: ApiClient;
  constructor () {
    this.client = new ApiClient('patient');
  }

  public async getById (id: number): Promise<PatientResource | PatientNotFoundError> {
    const response = await this.client.get<PatientResource>(`/patients/${id}`);
    if (!(response instanceof HttpError && response instanceof HttpNotFountError)) {
      const { data } = (response as IResponse<PatientResource>);
      return data;
    }
    if (response instanceof HttpNotFountError) {
      return new PatientNotFoundError();
    }
    return new PatientsServicesNotAvailableError();
  }
}
