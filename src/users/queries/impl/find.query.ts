import { WhereUserInput } from 'src/users/dto/where-user.input';
import { FindQuery } from 'src/core/queries/find.query';
import { BaseEntityEnum } from 'src/users/entities/order-user-enum';
import { PaginatorParams } from 'src/shared/dto/paginator.params.dto';

export class FindUserQuery extends FindQuery {
  constructor(
    public where?: WhereUserInput[],
    public paginatedOptions?: PaginatorParams,
    public orderBy?: BaseEntityEnum,
  ) {
    super();
  }
}
