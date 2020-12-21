import { Resolver, Args, Mutation, Subscription } from '@nestjs/graphql';
import { PubSub } from 'apollo-server-express';
import { Inject, Logger } from '@nestjs/common';
import { PUB_SUB } from 'src/shared/modules/graphql/gql-pubsub.provider';
import { CreateCompanyResponse } from '../responses/create-company.response';
import { CommandBus } from '@nestjs/cqrs';
import { CreateCompanyCommand } from '../../application/commands/impl/create-company.command';
import { CreateCompanyInput } from '../inputs/create-company.input';
import { CreateCompanyResponse as CreateCompanyUseCaseResp } from '../../application/useCases/createCompany/create-company.use-case';
import { CompanyErrors } from '../../domain/errors/company.error';
import { AppError } from 'src/shared/core/errors/AppError';
import { CodeExistError } from '../responses/code-exist.error';
import { NameExistError } from '../responses/name-exist.error';
import { ValidationError } from 'src/shared/core/presentation/responses/validation.error';
import { UnexpectedError } from 'src/shared/core/presentation/responses/unexpected.error';
import { Response } from 'src/shared/core/presentation/responses/success.response';
import { CompanyResp } from '../responses/company.resp';
import { CompanyEvents } from '../../domain/events/company-events.enum';

@Resolver()
export class CompanyResolver {
  constructor(
    @Inject(PUB_SUB) private readonly _pubsub: PubSub,
    private readonly _cBus: CommandBus,
  ) {}

  @Mutation(() => CreateCompanyResponse)
  async createCompany(@Args('input') input: CreateCompanyInput) {
    Logger.log('Create company', 'CompanyResolver');
    const resp: CreateCompanyUseCaseResp = await this._cBus.execute(
      new CreateCompanyCommand(input),
    );
    if (resp.isLeft) {
      switch (true) {
        case resp.value instanceof CompanyErrors.CodeExistError:
          return new CodeExistError(resp.value.errorValue().message);
        case resp.value instanceof CompanyErrors.NameExistError:
          return new NameExistError(resp.value.errorValue().message);
        case resp.value instanceof AppError.ValidationError:
          return new ValidationError(resp.value.errorValue().message);
        case resp.value instanceof AppError.UnexpectedError:
          return new UnexpectedError(
            resp.value.errorValue().message,
            resp.value.errorValue().error,
          );
      }
    }
    return new Response();
  }

  @Subscription(() => CompanyResp)
  onCompanyCreated() {
    Logger.log('Subscribed to CreatedCompany event', 'CompanyResolver');
    return this._pubsub.asyncIterator(CompanyEvents.CREATED);
  }
}
