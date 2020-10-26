import { User } from "../../entities/user.entity";
import { UpdateOneEvent } from "src/core/events/impl/updateone.event";

export class ForgotPasswordUserEvent extends UpdateOneEvent {
	constructor(public updatedUser: User, public password: string) {
		super(updatedUser);
	}
}