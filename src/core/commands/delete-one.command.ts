import { BaseCommand } from './base.command';

export class DeleteOneCommand extends BaseCommand {
  constructor(public where?: any) {
    super();
  }
}
