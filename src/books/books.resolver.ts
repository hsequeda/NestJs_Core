import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { BooksService } from './books.service';
import { Book } from './entities/book.entity';
import { CreateBookInput } from './dto/create-book.input';
import { UpdateBookInput } from './dto/update-book.input';
import { WhereBookInput } from './dto/where-book.input';
import { PayloadBook } from './dto/payload-book.dto';

@Resolver(() => Book)
export class BooksResolver {
  constructor(private readonly booksService: BooksService) {}

  @Mutation(() => Book)
  createBook(@Args('data') createBookInput: CreateBookInput) {
    return this.booksService.create(createBookInput);
  }

  @Query(() => PayloadBook, { name: 'books' })
  findAll(
    @Args('where', { type: () => [WhereBookInput], nullable: true })
    where: WhereBookInput[],
  ) {
    return this.booksService.findAll(where);
  }

  @Query(() => Book, { name: 'book' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.booksService.findOne(id);
  }

  @Mutation(() => Book)
  updateBook(
    @Args('where', { type: () => [WhereBookInput], nullable: true })
    where: WhereBookInput[],
    @Args('data') data: UpdateBookInput,
  ) {
    return this.booksService.update(where, data);
  }

  @Mutation(() => Book)
  removeBook(
    @Args('where', { type: () => [WhereBookInput], nullable: true })
    where: WhereBookInput[],
  ) {
    return this.booksService.remove(where);
  }
}
