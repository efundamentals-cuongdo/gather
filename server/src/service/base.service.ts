import { Injectable, HttpException, HttpStatus, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindManyOptions, FindOneOptions } from 'typeorm';
import { GetirDTO } from './dto/getir.dto';
import { GetirMapper } from './mapper/getir.mapper';
import { GetirRepository } from '../repository/getir.repository';
import { Getir } from '../domain/getir.entity';
import { FileService } from './file.service';
import { HttpService } from '@nestjs/axios';

const relationshipNames = [];

// @Injectable()
export abstract class BaseService {

  constructor(
    private fileService: FileService,
    private httpService: HttpService,
  ) { }

  async one(url: string): Promise<GetirDTO> {
    // //gather
    // const res = await this.httpService.get(url, { headers }).toPromise();
    // // this.logger.log('Product res: ', JSON.stringify(res.data.data));

    // //store json and jpg
    // const fileName = this.urlToProductId(url);
    // const imageUrls: string[] = res.data.data.product.picURLs;
    // this.store(['detail'], fileName, Buffer.from(JSON.stringify(res.data), 'utf-8'), '.json');
    // imageUrls.map(async (imageUrl, index) => {
    //   return this.storeAsStream(['detail'], fileName + index, imageUrl);
    // });


    // //extract (and save to database)
    // const product = new Getir();
    // product.url = url;
    // product.productNo = res.data.data.product.id;
    // product.name = res.data.data.product.name;
    // product.imageUrls = imageUrls;
    // this.getirRepository.save(product);

    // return GetirMapper.fromEntityToDTO(product);
    return null;
  }

  async searching(q: string): Promise<GetirDTO[]> {
    return null;
  }

  async category(url: string): Promise<GetirDTO[]> {
    return null;
  }

  private urlToProductId(url: string): string {
    return Buffer.from(url).toString('base64');
  }

  abstract getRetailer(): string;
  private async store(directories: string[], fileName: string, content: Buffer, extension: string): Promise<string> {
    const url = await this.fileService.store([this.getRetailer(), ...directories], fileName, extension, content);
    return url;
  }

  private async storeAsStream(directories: string[], fileName: string, url: string): Promise<string> {
    const response = await this.httpService.axiosRef({
      url,
      method: 'GET',
      responseType: 'stream',
    });

    return this.fileService.storeAsStream([this.getRetailer(), ...directories], fileName, '.jpg', response);
  }


}
