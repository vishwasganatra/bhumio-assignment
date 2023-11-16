import { Controller, Get } from '@nestjs/common';
import { FileService } from '../service/file.service';

@Controller()
export class FileController {
  constructor(private readonly appService: FileService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
}
