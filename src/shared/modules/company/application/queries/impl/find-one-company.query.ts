import { FindOneCompanyDto } from '../../dtos/find-one-company.dto';

export class FindOneCompanyQuery {
  constructor(public readonly input: FindOneCompanyDto) {}
}
