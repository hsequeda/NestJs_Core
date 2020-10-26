import { UpdateOneCommand } from "src/core/commands/impl/update-one.command";
import { FileInput } from "src/files/input/file.input";

export class UpdateOneFileCommand extends UpdateOneCommand {
  constructor(filter: any, public input: FileInput | any, upsert: boolean = false) {
    super(filter, input, upsert);
  }
}
