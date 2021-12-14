import { Injectable, Logger } from '@nestjs/common';
import { config } from '../config';
import * as fse from 'fs-extra';

@Injectable()
export class FileService {
    logger = new Logger('FileService');

    async remove(retailer: string, uuid: string, extension: string = 'json'): Promise<string> {
        const path = this.path(retailer, uuid, extension);

        try {
            await fse.remove(path);
            return retailer + '-' + uuid;
        } catch (err) {
            throw err;
        }
    }

    async store(retailer: string, uuid: string, extension: string, content: Buffer): Promise<string> {
        const path = this.path(retailer, uuid, extension);
        try {
            await fse.writeFile(path, content);
            return this.url(uuid, extension);
        } catch (err) {
            await fse.remove(path);
            throw err;
        }
    }

    // getFileSize(size: number): number {
    //     return round(size / (1024 * 1024), 2);
    // }

    // getFileExtension = (name: string) => name.split('.').pop();

    path = (retailer: string, code: string, extension: string): string => `${config.get('application.storage')}/${retailer}/${code}.${extension}`;

    url = (code: string, extension: string): string => `${config.get('application.static')}/${code}.${extension}`;

    // pathByFilename = (filename: string): string => `${config.get('application.static')}/${filename}`;
}
