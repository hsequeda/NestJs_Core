import { Resolver, Args, Subscription, Mutation } from '@nestjs/graphql';
import { PubSub } from 'apollo-server-express';
import { Inject } from '@nestjs/common';
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

@Resolver()
export class CompanyResolver {
  constructor(
    @Inject(PUB_SUB) private readonly _pubsub: PubSub,
    private readonly _cBus: CommandBus,
  ) {}

  @Mutation(() => CreateCompanyResponse)
  async createCompany(@Args('input') input: CreateCompanyInput) {
    const resp: CreateCompanyUseCaseResp = await this._cBus.execute(
      new CreateCompanyCommand(input),
    );
    if (resp.isLeft) {
      switch (true) {
        case resp instanceof CompanyErrors.CodeExistError:
          return { message: resp.value.errorValue().message } as CodeExistError;
        case resp instanceof CompanyErrors.NameExistError:
          return { message: resp.value.errorValue().message } as NameExistError;
        case resp instanceof AppError.ValidationError:
          return {
            message: resp.value.errorValue().message,
          } as ValidationError;

        case resp instanceof AppError.UnexpectedError:
          return {
            message: resp.value.errorValue().message,
          } as UnexpectedError;
      }
    }
    return true;
  }

  @Subscription()
  createCompanySubs() {
    return this._pubsub.asyncIterator('CreatedCompany');
  }
}
