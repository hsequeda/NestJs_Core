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
import { SuccessResponse } from 'src/shared/core/presentation/responses/success.response';
import { CompanyEvents } from '../../domain/events/company-events.enum';
import { DeleteCompanyCommand } from '../../application/commands/impl/delete-company.command';
import { DeleteCompanyInput } from '../inputs/delete-company.input';
import { DeleteCompanyUseCaseResp } from '../../application/useCases/deleteCompany/delete-company.use-case';
import { CompanyHasBeenDeletedError } from '../responses/company-has-been-deleted.error';
import { CompanyDoesntExistError } from '../responses/company-doesnt-exist.error';
import { DeleteCompanyResponse } from '../responses/delete-company.response';
import { CreatedCompanySubsResponse } from '../responses/created-company.subs-resp';
import { DeletedCompanySubsResponse } from '../responses/deleted-company.subs-resp';

@Resolver()
export class CompanyResolver {
  private _logger: Logger;
  constructor(
    @Inject(PUB_SUB) private readonly _pubsub: PubSub,
    private readonly _cBus: CommandBus,
  ) {
    this._logger = new Logger('CompanyResolver');
  }

  @Mutation(() => CreateCompanyResponse)
  async createCompany(@Args('input') input: CreateCompanyInput) {
    this._logger.log('Create company');
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
    return new SuccessResponse();
  }

  @Mutation(() => DeleteCompanyResponse)
  async deleteCompany(@Args('input') input: DeleteCompanyInput) {
    this._logger.log('Delete company');
    const resp: DeleteCompanyUseCaseResp = await this._cBus.execute(
      new DeleteCompanyCommand(input),
    );

    if (resp.isLeft) {
      switch (true) {
        case resp.value instanceof CompanyErrors.CompanyDoesntExist:
          return new CompanyDoesntExistError(resp.value.errorValue().message);
        case resp.value instanceof CompanyErrors.CompanyHasBeenDeleted:
          return new CompanyHasBeenDeletedError(
            resp.value.errorValue().message,
          );
        case resp.value instanceof AppError.ValidationError:
          return new ValidationError(resp.value.errorValue().message);
        case resp.value instanceof AppError.UnexpectedError:
          return new UnexpectedError(
            resp.value.errorValue().message,
            resp.value.errorValue().error,
          );
      }
    }
    return new SuccessResponse();
  }

  @Subscription(() => DeletedCompanySubsResponse)
  onCompanyDeleted() {
    this._logger.log('Subscribed to DeletedCompany event');
    return this._pubsub.asyncIterator(CompanyEvents.DELETED);
  }

  @Subscription(() => CreatedCompanySubsResponse)
  onCompanyCreated() {
    this._logger.log('Subscribed to CreatedCompany event');
    return this._pubsub.asyncIterator(CompanyEvents.CREATED);
  }
}
