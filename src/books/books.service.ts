import { Injectable } from '@nestjs/common';
import { CreateBookInput } from './dto/create-book.input';
import { UpdateBookInput } from './dto/update-book.input';
import { BaseService } from 'src/core/service/base.service';
import { Book } from './entities/book.entity';
import { QueryBus, CommandBus, EventBus } from '@nestjs/cqrs';
import { CreateBookCommand } from './commands/impl/create.command';
import { WhereBookInput } from './dto/where-book.input';
import { FindBookQuery } from './queries/impl/find.query';
import { DeleteBookCommand } from './commands/impl/delete.command';
import { UpdateBookCommand } from './commands/impl/update.command';

@Injectable()
export class BooksService extends BaseService<Book> {
  constructor(qBus: QueryBus, cBus: CommandBus, eBus: EventBus) {
    super(cBus, qBus, eBus);
  }
  create(createBookInput: CreateBookInput) {
    return this.createCommand(new CreateBookCommand(createBookInput));
  }

  findAll(where?: WhereBookInput[]) {
    return this.findQuery(new FindBookQuery(where));
  }

  findOne(id: number) {
    return `This action returns a #${id} book`;
  }

  update(where: WhereBookInput[], data: UpdateBookInput) {
    return this.updateCommand(new UpdateBookCommand(where, data));
  }

  remove(where: WhereBookInput[]) {
    return this.deleteCommand(new DeleteBookCommand(where));
  }
}
