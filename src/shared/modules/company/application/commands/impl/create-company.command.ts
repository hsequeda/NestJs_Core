import { CreateCompanyDto } from '../../dtos/create-company.dto';

export class CreateCompanyCommand {
  constructor(public readonly input: CreateCompanyDto) {}
}
