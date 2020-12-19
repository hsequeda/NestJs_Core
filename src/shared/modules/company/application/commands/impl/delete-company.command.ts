import { DeleteCompanyDto } from '../../dtos/delete-company.dto';

export class DeleteCompanyCommand {
  constructor(public readonly input: DeleteCompanyDto) {}
}
