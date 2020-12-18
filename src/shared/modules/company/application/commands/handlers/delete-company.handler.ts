import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { DeleteCompanyCommand } from '../impl/delete-company.command';
import { DeleteCompanyUseCase } from '../../useCases/deleteCompany/delete-company.use-case';

@CommandHandler(DeleteCompanyCommand)
export class DeleteCompanyHandler
  implements ICommandHandler<DeleteCompanyCommand> {
  constructor(private createCompanyUseCase: DeleteCompanyUseCase) {}
  async execute({ createCompanyDto }: DeleteCompanyCommand) {
    return await this.createCompanyUseCase.execute(createCompanyDto);
  }
}
