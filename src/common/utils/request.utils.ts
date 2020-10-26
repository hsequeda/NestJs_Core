import { Request } from 'express';
import { User } from 'src/user/entities/user.entity'

export default class RequestUtils {

	public static extractUserFromRequest = (req: Request): User => {
		let obj: any = {}
		Object.assign(obj, { ...req.user });
		delete obj._doc.password
		return obj._doc;
	}
}