import { Body, ClassSerializerInterceptor, Controller, Delete, Get, Logger, Param, Post as PostMethod, Put, UseGuards, Req, UseInterceptors, Query } from '@nestjs/common';
import { ApiBearerAuth, ApiUseTags, ApiResponse, ApiOperation, ApiImplicitQuery } from '@nestjs/swagger';
import { WalmartDTO } from '../../service/dto/walmart.dto';
import { WalmartService } from '../../service/walmart.service';
import { PageRequest, Page } from '../../domain/base/pagination.entity';
import { AuthGuard, Roles, RolesGuard, RoleType } from '../../security';
import { HeaderUtil } from '../../client/header-util';
import { Request } from '../../client/request';
import { LoggingInterceptor } from '../../client/interceptors/logging.interceptor';


@Controller('api/walmarts')
@UseGuards(AuthGuard, RolesGuard)
@UseInterceptors(LoggingInterceptor, ClassSerializerInterceptor)
@ApiBearerAuth()
@ApiUseTags('walmarts')
export class WalmartController {
  logger = new Logger('WalmartController');

  constructor(private readonly walmartService: WalmartService) { }

  // @Get('/')
  // @Roles(RoleType.USER)
  // @ApiResponse({
  //   status: 200,
  //   description: 'List all records',
  //   type: WalmartDTO,
  // })
  // async getAll(@Req() req: Request): Promise<WalmartDTO []>  {
  //   const pageRequest: PageRequest = new PageRequest(req.query.page, req.query.size, req.query.sort);
  //   const [results, count] = await this.walmartService.findAndCount({
  //     skip: +pageRequest.page * pageRequest.size,
  //     take: +pageRequest.size,
  //     order: pageRequest.sort.asOrder(),
  //   });
  //   HeaderUtil.addPaginationHeaders(req.res, new Page(results, count, pageRequest));
  //   return results;
  // }

  // @Get('/:id')
  // @Roles(RoleType.USER)
  // @ApiResponse({
  //   status: 200,
  //   description: 'The found record',
  //   type: WalmartDTO,
  // })
  // async getOne(@Param('id') id: number): Promise<WalmartDTO>  {
  //   return await this.walmartService.findById(id);
  // }

  @PostMethod('/detail')
  @Roles(RoleType.USER)
  @ApiResponse({
    status: 200,
    description: 'Gather 1 product by url',
    type: WalmartDTO,
  })
  async getOne(@Body() walmartDTO: WalmartDTO): Promise<WalmartDTO> {
    return await this.walmartService.one(walmartDTO.url);
  }

  // @PostMethod('/')
  // @Roles(RoleType.ADMIN)
  // @ApiOperation({ title: 'Create walmart' })
  // @ApiResponse({
  //   status: 201,
  //   description: 'The record has been successfully created.',
  //   type: WalmartDTO,
  // })
  // @ApiResponse({ status: 403, description: 'Forbidden.' })
  // async post(@Req() req: Request, @Body() walmartDTO: WalmartDTO): Promise<WalmartDTO>  {
  //   const created = await this.walmartService.save(walmartDTO, req.user?.login);
  //   HeaderUtil.addEntityCreatedHeaders(req.res, 'Walmart', created.id);
  //   return created;
  // }

  // @Put('/')
  // @Roles(RoleType.ADMIN)
  // @ApiOperation({ title: 'Update walmart' })
  // @ApiResponse({
  //   status: 200,
  //   description: 'The record has been successfully updated.',
  //   type: WalmartDTO,
  // })
  // async put(@Req() req: Request, @Body() walmartDTO: WalmartDTO): Promise<WalmartDTO>  {
  //   HeaderUtil.addEntityCreatedHeaders(req.res, 'Walmart', walmartDTO.id);
  //   return await this.walmartService.update(walmartDTO, req.user?.login);
  // }

  // @Put('/:id')
  // @Roles(RoleType.ADMIN)
  // @ApiOperation({ title: 'Update walmart with id' })
  // @ApiResponse({
  //   status: 200,
  //   description: 'The record has been successfully updated.',
  //   type: WalmartDTO,
  // })
  // async putId(@Req() req: Request, @Body() walmartDTO: WalmartDTO): Promise<WalmartDTO>  {
  //   HeaderUtil.addEntityCreatedHeaders(req.res, 'Walmart', walmartDTO.id);
  //   return await this.walmartService.update(walmartDTO, req.user?.login);
  // }

  // @Delete('/:id')
  // @Roles(RoleType.ADMIN)
  // @ApiOperation({ title: 'Delete walmart' })
  // @ApiResponse({
  //   status: 204,
  //   description: 'The record has been successfully deleted.',
  // })
  // async deleteById(@Req() req: Request, @Param('id') id: number): Promise<void>  {
  //   HeaderUtil.addEntityDeletedHeaders(req.res, 'Walmart', id);
  //   return await this.walmartService.deleteById(id);
  // }
}
