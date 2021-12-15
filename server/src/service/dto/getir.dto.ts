/* eslint-disable @typescript-eslint/no-unused-vars */
import { ApiModelProperty } from '@nestjs/swagger';
import { BaseDTO } from './base.dto';


/**
 * A GetirDTO object.
 */
export class GetirDTO extends BaseDTO {
    @ApiModelProperty({ description: 'url field', required: false })
    url: string;

    @ApiModelProperty({ description: 'productNo field', required: false })
    productNo: string;

    @ApiModelProperty({ description: 'name field', required: false })
    name: string;


    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove

}
