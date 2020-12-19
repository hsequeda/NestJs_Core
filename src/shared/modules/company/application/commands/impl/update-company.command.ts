import { UpdateCompanyDto } from '../../dtos/update-company.dto';

export class UpdateCompanyCommand {
  constructor(public readonly input: UpdateCompanyDto) {}
}
