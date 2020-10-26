import { Controller, Get, Post, Req, Res, UseGuards, UseInterceptors, HttpStatus, UploadedFile, UploadedFiles } from '@nestjs/common';
import { AuthGuard } from "@nestjs/passport";
import {RolesGuard} from 'src/common/guards/roles.guard';
import {Roles} from 'src/common/decorators/roles.decorators';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';

import { Request, Response } from 'express';
import { UploadService } from '../services/upload.service';

@Controller('files')
export class FilesController {
	constructor(private readonly uploadService: UploadService) { }


	@UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles('USER')
	@Post('/upload/avatar')
	@UseInterceptors(FileInterceptor('avatar'))
	async avatar(@UploadedFile() file: any, @Req() req: Request, @Res() res: Response) {
		try {
			res.send(await this.uploadService.uploadAvatar(file));
		} catch (e) {
			res.status(HttpStatus.INTERNAL_SERVER_ERROR).send(e);
		}
	}

}
