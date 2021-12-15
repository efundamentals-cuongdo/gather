import { Body, ClassSerializerInterceptor, Controller, Delete, Get, Logger, Param, Post as PostMethod, Put, UseGuards, Req, UseInterceptors, Query } from '@nestjs/common';
import { ApiBearerAuth, ApiUseTags, ApiResponse, ApiOperation, ApiImplicitQuery } from '@nestjs/swagger';
import { GetirDTO, GetirGetOneDTO, GetirSearchDTO } from '../../service/dto/getir.dto';
import { GetirService } from '../../service/getir.service';
import { PageRequest, Page } from '../../domain/base/pagination.entity';
import { AuthGuard, Roles, RolesGuard, RoleType } from '../../security';
import { HeaderUtil } from '../../client/header-util';
import { Request } from '../../client/request';
import { LoggingInterceptor } from '../../client/interceptors/logging.interceptor';


@Controller('api/getirs')
// @UseGuards(AuthGuard, RolesGuard)
@UseInterceptors(LoggingInterceptor, ClassSerializerInterceptor)
// @ApiBearerAuth()
@ApiUseTags('getirs')
export class GetirController {
  logger = new Logger('GetirController');

  constructor(private readonly getirService: GetirService) { }

  @PostMethod('/detail')
  // @Roles(RoleType.USER)
  @ApiResponse({
    status: 200,
    description: 'Gather 1 product by url',
    type: GetirDTO,
  })
  async getOne(@Body() getirDTO: GetirGetOneDTO): Promise<GetirDTO> {
    const rs: any = await this.getirService.one(getirDTO.url);
    return rs;
  }

  @PostMethod('/search')
  // @Roles(RoleType.USER)
  @ApiResponse({
    status: 200,
    description: 'Gather products from searching',
    type: GetirDTO,
  })
  async search(@Body() getirDTO: GetirSearchDTO): Promise<GetirDTO[]> {
    return await this.getirService.search(getirDTO.url, getirDTO.term);
  }
}
