import { Injectable, NotAcceptableException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { AuthenticationError, ApolloError } from 'apollo-server-express';


import { UserService } from 'src/user/services/user.service';
import { User } from 'src/user/entities/user.entity'
import { IJwtPayload } from '../interface/IJwtPayload';
import { MailNotificationService, MailType } from 'src/notification/services/mail.notification.service.ts';
import { AuthInput } from '../inputs/auth.input';
import { UserInput } from '../../user/input/user.input';
import { ChangePasswordInput } from '../inputs/change-password.input';

@Injectable()
export class AuthService {

	constructor(
		private readonly userService: UserService,
		private readonly jwtService: JwtService,
		private readonly mailService: MailNotificationService
	) { }

	async validateUser(email: string, password: string): Promise<User | undefined> {

		const user = await this.userService.validateUser(email, password);
		if (user) {
			return user;
		}
		return null;
	}


	async validateUserByJwtPayload(payload: IJwtPayload) {
		let u: User = await this.userService.findOne({ _id: payload.sub });
		if (!u) {
			return null;
		}
		u.password = null;
		return u;
	}

	async login(user: any) {
		const payload: IJwtPayload = { sub: user._id, username: user.email };
		return {
			user: user,
			jwt: this.jwtService.sign(payload),
		};
	}

	async forgot(email: string) {
		const user: User = await this.userService.restorePassword(email);
		return user ? user.email : 'El Correo no existe en nuestra plataforma';
	}

	async signIn(input: AuthInput) {
		const user: User = await this.validateUser(input.email, input.password);
		if (!user) {
			throw new AuthenticationError('Unauthorized');
		}
		return await this.login(user);
	}

	async signUp(input: UserInput) {
		return await this.login(await this.userService.register(input));
	}

	async changePassword(user: User, input: ChangePasswordInput) {
		const u: User = await this.userService.getUserByEmail(user?.email);
		if (!u) {
			throw new ApolloError(`The user is not in the database`, 'REQUEST_ERROR');
		}

		if (!this.userService.matchPassword(input.password, u.password)) {
			throw new ApolloError(
				`The user's input password does not match with stored in the database`,
				'REQUEST_ERROR',
			);
		}
		if (input.new_password !== input.repeat_new_password) {
			throw new NotAcceptableException(`Passwords do not match`);
		}

		return await this.userService.setPassword(u, input.new_password);
	}

}
