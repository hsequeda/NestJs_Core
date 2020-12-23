import { Resolver, Args, Mutation, Subscription, Query } from '@nestjs/graphql';
import { PubSub } from 'apollo-server-express';
import { Inject, Logger } from '@nestjs/common';
import { PUB_SUB } from 'src/shared/modules/graphql/gql-pubsub.provider';
import { CreateCompanyResponse } from '../responses/create-company.response';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { CreateCompanyCommand } from '../../application/commands/impl/create-company.command';
import { CreateCompanyInput } from '../inputs/create-company.input';
import { CreateCompanyResponse as CreateCompanyUseCaseResp } from '../../application/useCases/createCompany/create-company.use-case';
import { CompanyErrors } from '../../domain/errors/company.error';
import { AppError } from 'src/shared/core/errors/AppError';
import { CompanyCodeExistError } from '../responses/code-exist.error';
import { CompanyNameExistError } from '../responses/name-exist.error';
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
import { UpdateCompanyInput } from '../inputs/update-company.input';
import { UpdateCompanyCommand } from '../../application/commands/impl/update-company.command';
import { UpdateCompanyResponse } from '../responses/update-company.response';
import { UpdatedCompanySubsResponse } from '../responses/updated-company.subs-resp';
import { FindOneCompanyResponse } from '../responses/find-one-company.response';
import { FindOneCompanyInput } from '../inputs/find-one-company.input';
import { FindOneCompanyUseCaseResp } from '../../application/useCases/findOneCompany/findone-company.use-case';
import { FindOneCompanyQuery } from '../../application/queries/impl/find-one-company.query';
import { CompanyResp } from '../responses/company.resp';
import { Company } from '../../domain/entities/company.entity';
import { CompanyMap } from '../../infrastructure/mapper/company.mapper';
import { PaginatedFindCompanyInput } from '../inputs/paginated-find-company.input';
import { PaginatedFindCompanyUseCaseResp } from '../../application/useCases/paginatedFindCompany/paginated-find-company.use-case';
import { PaginatedFindCompanyQuery } from '../../application/queries/impl/paginated-find-company.query';
import { PaginatedFindCompanyResponse } from '../responses/paginated-find-company.response';
import { PaginatedFindResult } from 'src/shared/core/PaginatedFindResult';
import { PaginatedFindCompanyResult } from '../responses/paginated-find-company.result';

@Resolver()
export class CompanyResolver {
  private _logger: Logger;
  constructor(
    @Inject(PUB_SUB) private readonly _pubsub: PubSub,
    private readonly _cBus: CommandBus,
    private readonly _qBus: QueryBus,
  ) {
    this._logger = new Logger('CompanyResolver');
  }

  @Query(() => PaginatedFindCompanyResponse)
  async paginatedFindCompany(@Args() input: PaginatedFindCompanyInput) {
    this._logger.log('Paginated find companies');
    const resp: PaginatedFindCompanyUseCaseResp = await this._qBus.execute(
      new PaginatedFindCompanyQuery(input),
    );

    if (resp.isLeft()) {
      const error = resp.value;
      switch (true) {
        case error instanceof AppError.ValidationError:
          return new ValidationError(resp.value.errorValue().message);
        case error instanceof AppError.UnexpectedError:
          return new UnexpectedError(
            resp.value.errorValue().message,
            resp.value.errorValue().error,
          );
      }
    }

    const paginatedFindCompanyRes: PaginatedFindResult<Company> = resp.value.getValue() as PaginatedFindResult<
      Company
    >;

    return new PaginatedFindCompanyResult(
      paginatedFindCompanyRes.items,
      paginatedFindCompanyRes.limit,
      paginatedFindCompanyRes.currentPage,
      paginatedFindCompanyRes.totalPages,
    );
  }
  @Query(() => FindOneCompanyResponse)
  async findOneCompany(@Args('input') input: FindOneCompanyInput) {
    this._logger.log('Find one company');
    const resp: FindOneCompanyUseCaseResp = await this._qBus.execute(
      new FindOneCompanyQuery(input),
    );

    if (resp.isLeft()) {
      switch (true) {
        case resp.value instanceof CompanyErrors.CompanyDoesntExist:
          return new CompanyDoesntExistError(resp.value.errorValue().message);
        case resp.value instanceof AppError.UnexpectedError:
          return new UnexpectedError(
            resp.value.errorValue().message,
            resp.value.errorValue().error,
          );
      }
    }
    return new CompanyResp(
      CompanyMap.DomainToDto(resp.value.getValue() as Company),
    );
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
          return new CompanyCodeExistError(resp.value.errorValue().message);
        case resp.value instanceof CompanyErrors.NameExistError:
          return new CompanyNameExistError(resp.value.errorValue().message);
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

  @Mutation(() => UpdateCompanyResponse)
  async updateCompany(@Args('input') input: UpdateCompanyInput) {
    this._logger.log('Update company');
    const resp: CreateCompanyUseCaseResp = await this._cBus.execute(
      new UpdateCompanyCommand(input),
    );
    if (resp.isLeft) {
      switch (true) {
        case resp.value instanceof CompanyErrors.CodeExistError:
          return new CompanyCodeExistError(resp.value.errorValue().message);
        case resp.value instanceof CompanyErrors.NameExistError:
          return new CompanyNameExistError(resp.value.errorValue().message);
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

  @Subscription(() => UpdatedCompanySubsResponse)
  onCompanyUpdated() {
    this._logger.log('Subscribed to UpdatedCompany event');
    return this._pubsub.asyncIterator(CompanyEvents.UPDATED);
  }

  @Subscription(() => CreatedCompanySubsResponse)
  onCompanyCreated() {
    this._logger.log('Subscribed to CreatedCompany event');
    return this._pubsub.asyncIterator(CompanyEvents.CREATED);
  }
}
