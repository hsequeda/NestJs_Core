import { UpdateCompanyCommand } from '../impl/update-company.command';
import { ICommandHandler, CommandHandler } from '@nestjs/cqrs';
import { UpdateCompanyUseCase } from '../../useCases/updateCompany/update-company.use-case';

@CommandHandler(UpdateCompanyCommand)
export class UpdateCompanyHandler
  implements ICommandHandler<UpdateCompanyCommand> {
  constructor(private readonly updateCompanyUseCase: UpdateCompanyUseCase) {}
  async execute({ input }: UpdateCompanyCommand) {
    return await this.updateCompanyUseCase.execute(input);
  }
}
