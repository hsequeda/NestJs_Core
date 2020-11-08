import { BaseCommand } from './base.command';

export class DeleteCommand extends BaseCommand {
  constructor(public where: any) {
    super();
  }
}
