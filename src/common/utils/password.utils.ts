import { compareSync, hashSync } from 'bcrypt';

export default class PasswordUtil {

	public static hashPassword = (password: string): string => {
		return hashSync(password, 10);
	}

	public static compare = (plainPassword: string, hashPassword: string): boolean => {
		return compareSync(plainPassword, hashPassword);
	}
}