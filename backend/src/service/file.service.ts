import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Files } from '../entity/file.entity';
@Injectable()
export class FileService {
  constructor(
    @InjectRepository(Files)
    private readonly fileRepository: Repository<Files>,
  ) {}

  async uploadFile(filename: string, path: string): Promise<Files> {
    const file = new Files();
    file.filename = filename;
    file.path = path;
    return await this.fileRepository.save(file);
  }

  async getFileById(id: number): Promise<Files> {
    return await this.fileRepository.findOneBy({ id: id });
  }
}
