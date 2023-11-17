import {
  Controller,
  Get,
  NotFoundException,
  Param,
  Put,
  Res,
  UseInterceptors,
  UploadedFile,
  Logger,
} from '@nestjs/common';
import { FileService } from '../service/file.service';
import { Response } from 'express';
import * as fs from 'fs';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import * as path from 'path';

@Controller('files')
export class FileController {
  constructor(private readonly fileService: FileService) {}

  @Get(':id')
  async getFileById(@Param('id') id: string, @Res() res: Response) {
    try {
      const file = await this.fileService.getFileById(+id);
      const fileStream = fs.createReadStream(file.path);
      res.setHeader(
        'Content-Disposition',
        `attachment; filename=${file.filename}`,
      );
      res.setHeader('Content-Type', `application/pdf`);
      fileStream.pipe(res);
      // res.setHeader(
      //   'Content-Disposition',
      //   `attachment; filename=${file.filename}`,
      // );
      // res.sendFile(file.path);
    } catch (error) {
      if (error instanceof NotFoundException) {
        res.status(404).send('File not found');
      } else {
        res.status(500).send('Internal server error');
      }
    }
  }

  @Put('upload')
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: './uploads', // Destination folder
        filename: (req, file, cb) => {
          // Save file as 'example.pdf' regardless of original filename
          cb(null, 'example.pdf');
        },
      }),
    }),
  )
  uploadFile(@UploadedFile() file) {
    const normalizedPath = file.path.replace(/\\/g, '/');
    // File uploaded successfully, perform any additional operations here
    return { filename: file.filename, path: normalizedPath }; // Return filename and path
  }
}
