import ApiError from '../core/api.error';

export class MalformedRequestError extends ApiError {
  constructor () {
    super('Malformed Request', 1);
  }
}

export class PhysicianNotFoundError extends ApiError {
  constructor () {
    super('Physician Not Found', 2);
  }
}

export class PatientNotFoundError extends ApiError {
  constructor () {
    super('Patient Not Found', 3);
  }
}

export class MetricsServicesNotAvailableError extends ApiError {
  constructor () {
    super('Metrics Services Not Available', 4);
  }
}

export class PhysiciansServicesNotAvailableError extends ApiError {
  constructor () {
    super('Physicians Services Not Available', 5);
  }
}

export class PatientsServicesNotAvailableError extends ApiError {
  constructor () {
    super('Patients Services Not Available', 6);
  }
}
