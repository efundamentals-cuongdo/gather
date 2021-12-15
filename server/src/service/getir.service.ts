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
const RETAILER = 'Getir';

@Injectable()
export class GetirService {

  logger = new Logger('GetirService');

  constructor(
    @InjectRepository(GetirRepository) private getirRepository: GetirRepository,
    private fileService: FileService,
    private httpService: HttpService,
  ) { }

  async one(url: string): Promise<GetirDTO> {
    //gather to storage
    const headers = {
      'Content-Type': 'application/json; charset=utf-8;',
      'accept-version': '2.0.0',
      'Accept-Language': 'en',
      'token': '1639473554517b2028a2352bf5d2761d2fa8b8f1cebc8ec3bf1aa42752c1d873428038dc5d338',
      'Device-Type': 'Android',
      'access_token': '1639473554517b2028a2352bf5d2761d2fa8b8f1cebc8ec3bf1aa42752c1d873428038dc5d338',
      'Host': 'getirx-client-api-gateway.getirapi.com',
      'Connection': 'Keep-Alive',
      'Accept-Encoding': 'gzip',
      'User-Agent': 'okhttp/3.14.9',
      'Accept': '*/*',

    };

    const res = await this.httpService.get(url,{ headers }).toPromise();
    this.logger.log('Product res: ', JSON.stringify(res.data.data));

    const fileName = this.urlToProductId(url);
    await this.store(['detail'], fileName, Buffer.from(JSON.stringify(res.data), 'utf-8'), '.json');
    const imageUrls: string[] = res.data.data.product.picURLs;
    await Promise.all(imageUrls.map(async imageUrl => {
      const image = await this.httpService.get(imageUrl).toPromise();
      this.store(['detail'], fileName, Buffer.from(image.data, 'binary'), this.fileService.getFileExtension(imageUrl));
    }));

    //extract (and save to database)
    const product = new Getir();
    product.productNo = res.data.data.product.id;
    product.name = res.data.data.product.name;
    this.getirRepository.save(product);

    return GetirMapper.fromEntityToDTO(product);
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

  private async store(directories: string[], fileName: string, content: Buffer, extension: string): Promise<string> {
    const url = await this.fileService.store([RETAILER, ...directories], fileName, extension, content);
    return url;
  }


}
