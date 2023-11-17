import { Module } from '@nestjs/common';
import { FileController } from './controller/file.controller';
import { FileService } from './service/file.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Files } from './entity/file.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      password: 'postgres',
      username: 'postgres',
      entities: [Files],
      database: 'bhumio',
      synchronize: true,
      logging: true,
      autoLoadEntities: true,
    }),
    TypeOrmModule.forFeature([Files]),
  ],
  controllers: [FileController],
  providers: [FileService],
})
export class AppModule {}
