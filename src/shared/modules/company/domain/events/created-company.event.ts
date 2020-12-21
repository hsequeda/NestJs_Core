import { Company } from '../entities/company.entity';

export class CreatedCompanyEvent {
  constructor(public readonly newCompany: Company) {}
}
