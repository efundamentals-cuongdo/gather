import { Injectable, HttpException, HttpStatus, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindManyOptions, FindOneOptions } from 'typeorm';
import { FileService } from './file.service';
import { HttpService } from '@nestjs/axios';
import { BaseDTO } from './dto/base.dto';

const relationshipNames = [];

// @Injectable()
export abstract class BaseService {

  constructor(
    protected fileService: FileService,
    protected httpService: HttpService,
  ) { }

  async one(url: string): Promise<BaseDTO> {
    //gather
    const data = await this.queryOne(url);
    data.url = url;

    //store json and jpg
    this.storeOne(data);

    //extract (and save to database)
    return this.extractOne(data);
  }

  // async search(q: string): Promise<BaseDTO[]> {
  //   return null;
  // }

  // async category(url: string): Promise<BaseDTO[]> {
  //   return null;
  // }

  urlToProductId(url: string): string {
    return Buffer.from(url).toString('base64').replace('/', '%2F');
  }

  protected abstract getRetailer(): string
  protected abstract queryOne(url: string): Promise<any>
  protected abstract storeOne(data: any): Promise<void>
  protected abstract extractOne(data: any): Promise<BaseDTO>

  async store(directories: string[], fileName: string, content: Buffer, extension: string): Promise<string> {
    const url = await this.fileService.store([this.getRetailer(), ...directories], fileName, extension, content);
    return url;
  }

  async storeAsStream(directories: string[], fileName: string, url: string): Promise<string> {
    const response = await this.httpService.axiosRef({
      url,
      method: 'GET',
      responseType: 'stream',
    });

    return this.fileService.storeAsStream([this.getRetailer(), ...directories], fileName, '.jpg', response);
  }


}
