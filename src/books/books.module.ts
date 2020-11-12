import { Module } from '@nestjs/common';
import { BooksService } from './books.service';
import { BooksResolver } from './books.resolver';
import { CqrsModule } from '@nestjs/cqrs';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Book } from './entities/book.entity';
import { BookCommandHandlers } from './commands/handlers';
import { BookQueryHandlers } from './queries/handlers';
import { BooksRepository } from './repositories/books.repository';
import { UsersModule } from 'src/users/users.module';

@Module({
  imports: [CqrsModule, UsersModule, TypeOrmModule.forFeature([Book])],
  providers: [
    BooksResolver,
    BooksService,
    BooksRepository,
    ...BookCommandHandlers,
    ...BookQueryHandlers,
  ],
})
export class BooksModule {}
