import { WhereUserInput } from 'src/users/dto/where-user.input';
import { FindQuery } from 'src/core/queries/find.query';

export class FindUserQuery extends FindQuery {
  constructor(public where: WhereUserInput[]) {
    super();
  }
}
