import { BaseCommand } from './base.command';

export class AggregateCommand extends BaseCommand {
  constructor(public pipe: object[]) {
    super();
  }
}
