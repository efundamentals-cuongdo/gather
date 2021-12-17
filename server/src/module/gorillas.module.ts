import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GorillasController } from '../web/rest/gorillas.controller';
import { GorillasRepository } from '../repository/gorillas.repository';
import { GorillasService } from '../service/gorillas.service';
import { FileModule } from './file.module';
import { HttpModule } from '@nestjs/axios';


@Module({
  imports: [
    TypeOrmModule.forFeature([GorillasRepository]),
    FileModule,
    HttpModule,
  ],
  controllers: [GorillasController],
  providers: [GorillasService],
  exports: [GorillasService],
})
export class GorillasModule { }
