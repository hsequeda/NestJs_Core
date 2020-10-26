import { CreateCommand } from "src/core/commands/impl/create.command";
import { BaseEntity } from "src/core/entity/base.entity";
import { FileInput } from "src/files/input/file.input";

export class CreateFileCommand extends CreateCommand {
  constructor(public input: FileInput | BaseEntity) {
    super(input);
  }
}
