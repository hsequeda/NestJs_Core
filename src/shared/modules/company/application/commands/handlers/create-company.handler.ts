import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { CreateCompanyCommand } from '../impl/create-company.command';
import { CreateCompanyUseCase } from '../../useCases/createCompany/create-company.use-case';

@CommandHandler(CreateCompanyCommand)
export class CreateCompanyHandler
  implements ICommandHandler<CreateCompanyCommand> {
  constructor(private createCompanyUseCase: CreateCompanyUseCase) {}
  async execute({ createCompanyDto }: CreateCompanyCommand) {
    return await this.createCompanyUseCase.execute(createCompanyDto);
  }
}
