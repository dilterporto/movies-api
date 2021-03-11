import { ClinicResource } from './clinic.api.client';
import { PatientResource } from './patient.api.client';
import { PhysicianResource } from './PhysicianApiClient';
import { AddSingleton } from '../core/ioc';
import ApiClient from '../core/api.client';
import * as flat from 'flat';
import { MetricsServicesNotAvailableError } from './errors';
import { HttpError } from '../core/response';

export interface MetricsRequest {
  clinic: ClinicResource;
  patient: PatientResource;
  physician: PhysicianResource;
}

@AddSingleton(MetricsApiClient)
export default class MetricsApiClient {
  private client: ApiClient;
  constructor () {
    this.client = new ApiClient('metrics');
  }

  public async post (metrics: MetricsRequest): Promise<void | MetricsServicesNotAvailableError> {
    let data: any = metrics;
    data.patient.name = data.patient.fullName;
    data.physician.name = data.physician.fullName;
    delete data.patient.fullName;
    delete data.patient.clinic;
    delete data.physician.fullName;
    data = flat(data, {
      delimiter: '_'
    });

    const response = await this.client.post<any | HttpError>('/metrics', data);
    const hasError = !!response;
    if (hasError) {
      return new MetricsServicesNotAvailableError();
    }
  }
}
