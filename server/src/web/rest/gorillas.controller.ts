import { Body, ClassSerializerInterceptor, Controller, Delete, Get, Logger, Param, Post as PostMethod, Put, UseGuards, Req, UseInterceptors, Query } from '@nestjs/common';
import { ApiBearerAuth, ApiUseTags, ApiResponse, ApiOperation, ApiImplicitQuery } from '@nestjs/swagger';
import { GorillasDTO, GorillasGetOneDTO, GorillasSearchDTO } from '../../service/dto/gorillas.dto';
import { GorillasService } from '../../service/gorillas.service';
import { PageRequest, Page } from '../../domain/base/pagination.entity';
import { AuthGuard, Roles, RolesGuard, RoleType } from '../../security';
import { HeaderUtil } from '../../client/header-util';
import { Request } from '../../client/request';
import { LoggingInterceptor } from '../../client/interceptors/logging.interceptor';


@Controller('api/gorillases')
// @UseGuards(AuthGuard, RolesGuard)
@UseInterceptors(LoggingInterceptor, ClassSerializerInterceptor)
// @ApiBearerAuth()
@ApiUseTags('gorillas')
export class GorillasController {
  logger = new Logger('GorillasController');

  constructor(private readonly gorillasService: GorillasService) { }

  @PostMethod('/detail')
  // @Roles(RoleType.USER)
  @ApiResponse({
    status: 200,
    description: 'Gather 1 product by url',
    type: GorillasDTO,
  })
  async getOne(@Body() gorillasDTO: GorillasGetOneDTO): Promise<GorillasDTO> {
    const rs: any = await this.gorillasService.one(gorillasDTO.url);
    return rs;
  }

  @PostMethod('/search')
  // @Roles(RoleType.USER)
  @ApiResponse({
    status: 200,
    description: 'Gather products from searching',
    type: GorillasDTO,
  })
  async search(@Body() gorillasDTO: GorillasSearchDTO): Promise<GorillasDTO[]> {
    return await this.gorillasService.search(gorillasDTO.url, gorillasDTO.term);
  }
}
