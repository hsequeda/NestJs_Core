import { CreateEvent } from "src/core/events/impl/create.event";
import { User } from "../../entities/user.entity";

export class CreateUserEvent extends CreateEvent {
	constructor(public newInstance: User) {
		super(newInstance);
	}
}