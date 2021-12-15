import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GetirController } from '../web/rest/getir.controller';
import { GetirRepository } from '../repository/getir.repository';
import { GetirService } from '../service/getir.service';
import { FileModule } from './file.module';
import { HttpModule } from '@nestjs/axios';


@Module({
  imports: [
    TypeOrmModule.forFeature([GetirRepository]),
    FileModule,
    HttpModule,
  ],
  controllers: [GetirController],
  providers: [GetirService],
  exports: [GetirService],
})
export class GetirModule { }
