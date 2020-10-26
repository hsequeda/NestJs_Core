import { Controller, Get, Post, Req, Res, UseGuards } from '@nestjs/common';
import { AuthGuard } from "@nestjs/passport";
import { Request, Response } from 'express';
import { AuthService } from '../services/auth.service';

@Controller('auth')
export class AuthController {
	constructor(private readonly authService: AuthService) { }

	@UseGuards(AuthGuard('local'))
	@Post('/login')
	async login(@Req() req: Request, @Res() res: Response) {
		res.send(await this.authService.login(req.user));
	}

}
