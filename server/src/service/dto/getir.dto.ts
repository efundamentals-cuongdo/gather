/* eslint-disable @typescript-eslint/no-unused-vars */
import { ApiModelProperty } from '@nestjs/swagger';
import { BaseDTO } from './base.dto';

export class GetirGetOneDTO {
    @ApiModelProperty({ description: 'url field', required: true })
    url: string;
}

export class GetirSearchDTO {
    @ApiModelProperty({ description: 'url field', required: true })
    url: string;

    @ApiModelProperty({ description: 'search term field', required: false })
    term: string;
}

/**
 * A GetirDTO object.
 */
export class GetirDTO extends BaseDTO {
    @ApiModelProperty({ description: 'url field', required: true })
    url: string;

    @ApiModelProperty({ description: 'productNo field', required: false })
    productNo: string;

    @ApiModelProperty({ description: 'name field', required: false })
    name: string;

    @ApiModelProperty({ description: 'image urls field', required: false })
    imageUrls: string[];


    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
}
