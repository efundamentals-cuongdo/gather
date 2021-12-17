/* eslint-disable @typescript-eslint/no-unused-vars */
import { ApiModelProperty } from '@nestjs/swagger';
import { BaseDTO } from './base.dto';

export class GorillasGetOneDTO {
    @ApiModelProperty({ description: 'url field', required: true })
    url: string;
}

export class GorillasSearchDTO {
    @ApiModelProperty({ description: 'url field', required: true })
    url: string;

    @ApiModelProperty({ description: 'search term field', required: false })
    term: string;
}

/**
 * A GorillasDTO object.
 */
export class GorillasDTO extends BaseDTO {
    @ApiModelProperty({ description: 'url field', required: true })
    url: string;

    @ApiModelProperty({ description: 'productNo field', required: false })
    productNo: string;

    @ApiModelProperty({ description: 'name field', required: false })
    name: string;


    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
}
