import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { CreateCompanyUseCase } from './application/useCases/createCompany/create-company.use-case';
import { DeleteCompanyUseCase } from './application/useCases/deleteCompany/delete-company.use-case';
import { CommandHandlers } from './application/commands/handlers';
import { CompanyRepository } from './infrastructure/repositories/company.repository';
import { CompanyResolver } from './presentation/resolvers/company.resolver';
import { UpdateCompanyUseCase } from './application/useCases/updateCompany/update-company.use-case';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CompanyEntity } from './infrastructure/entities/company.entity';
import { EventHandlers } from './presentation/subscribers/index';

@Module({
  imports: [TypeOrmModule.forFeature([CompanyEntity]), CqrsModule],
  providers: [
    CompanyResolver,
    CreateCompanyUseCase,
    UpdateCompanyUseCase,
    DeleteCompanyUseCase,
    ...CommandHandlers,
    ...EventHandlers,
    {
      provide: 'ICompanyRepository',
      useClass: CompanyRepository,
    },
  ],
})
export class CompanyModule {}
