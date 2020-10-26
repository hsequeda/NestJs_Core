import { Injectable } from '@nestjs/common';
import { FilesRepository } from '../repositories/files.repository';

import { File, FileType } from '../entities/file.entity'
var cloudinary = require('cloudinary').v2;
const DatauriParser = require('datauri/parser');

@Injectable()
export class UploadService {

	private parser: any;

	constructor(private readonly filesRepository: FilesRepository) {
		cloudinary.config({
			cloud_name: process.env.CLOUDINARY_NAME,
			api_key: process.env.CLOUDINARY_API_KEY,
			api_secret: process.env.CLOUDINARY_API_SECRET
		});
		this.parser = new DatauriParser();
	}

	async uploadAvatar(file: any): Promise<File> {
		if (!file) {
			return null;
		}
		const dataUri = this.parser.format(file.originalname, file.buffer);
		const result = await cloudinary.uploader.upload(dataUri.content);
		if (!result) {
			return null;
		}
		return await this.filesRepository.create({
			type: FileType.PICTURE,
			url: result.url,
			bytes: result.bytes,
			format: result.format,
			public_id: result.public_id
		});
	}

	/*async uploadMultiple(files: any[]) {
		let filesUrls: string[] = [];
		if (files instanceof Array && files.length > 0) {
			for (let file of files) {
				filesUrls.push(await this.upload(file));
			}
		}
		return filesUrls;
	}*/

}
