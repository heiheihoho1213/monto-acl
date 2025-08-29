import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Res } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth, ApiResponse, ApiParam, ApiBody } from '@nestjs/swagger';
import { Response } from 'express';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { ResourceService } from './resource.service';
import { CreateResourceDto } from './dto/create-resource.dto';
import { UpdateResourceDto } from './dto/update-resource.dto';
import { ResponseUtil } from '../common/utils/response.util';

@ApiTags('资源管理')
@ApiBearerAuth('JWT-auth')
@UseGuards(JwtAuthGuard)
@Controller('resource')
export class ResourceController {
  constructor(private readonly resourceService: ResourceService) { }

  @Post()
  @ApiOperation({
    summary: '创建资源',
    description: '创建一个新资源，需要提供资源名称和项目名称'
  })
  @ApiBody({
    type: CreateResourceDto,
    description: '资源创建信息'
  })
  @ApiResponse({
    status: 201,
    description: '资源创建成功',
    schema: {
      example: {
        success: true,
        code: 201,
        message: '资源创建成功',
        data: {
          id: 1,
          resource: 'user:read',
          namespace: 'default',
          description: '读取用户信息的权限',
          type: 'api',
          createTime: 1704067200,
          updateTime: 1704067200
        },
        timestamp: '2024-01-01T00:00:00.000Z'
      }
    }
  })
  @ApiResponse({
    status: 400,
    description: '请求参数错误'
  })
  @ApiResponse({
    status: 401,
    description: '未授权访问'
  })
  async create(@Body() createResourceDto: CreateResourceDto, @Res() res: Response) {
    const resource = await this.resourceService.create(createResourceDto);
    return ResponseUtil.created(res, resource, '资源创建成功');
  }

  @Get()
  @ApiOperation({
    summary: '获取资源列表',
    description: '获取所有资源的列表信息'
  })
  @ApiResponse({
    status: 200,
    description: '获取资源列表成功',
    schema: {
      example: {
        success: true,
        code: 200,
        message: '获取资源列表成功',
        data: [
          {
            id: 1,
            resource: 'user:read',
            namespace: 'default',
            description: '读取用户信息的权限',
            type: 'api'
          }
        ],
        timestamp: '2024-01-01T00:00:00.000Z'
      }
    }
  })
  @ApiResponse({
    status: 401,
    description: '未授权访问'
  })
  async findAll(@Res() res: Response) {
    const resources = await this.resourceService.findAll();
    return ResponseUtil.success(res, resources, '获取资源列表成功');
  }

  @Get(':id')
  @ApiOperation({
    summary: '根据ID获取资源',
    description: '根据资源ID获取资源的详细信息'
  })
  @ApiParam({
    name: 'id',
    description: '资源ID',
    example: 1,
    type: 'number'
  })
  @ApiResponse({
    status: 200,
    description: '获取资源信息成功',
    schema: {
      example: {
        success: true,
        code: 200,
        message: '获取资源信息成功',
        data: {
          id: 1,
          resource: 'user:read',
          namespace: 'default',
          description: '读取用户信息的权限',
          type: 'api'
        },
        timestamp: '2024-01-01T00:00:00.000Z'
      }
    }
  })
  @ApiResponse({
    status: 404,
    description: '资源不存在'
  })
  @ApiResponse({
    status: 401,
    description: '未授权访问'
  })
  async findOne(@Param('id') id: string, @Res() res: Response) {
    const resource = await this.resourceService.findOne(+id);
    return ResponseUtil.success(res, resource, '获取资源信息成功');
  }

  @Patch(':id')
  @ApiOperation({
    summary: '更新资源',
    description: '根据资源ID更新资源信息'
  })
  @ApiParam({
    name: 'id',
    description: '资源ID',
    example: 1,
    type: 'number'
  })
  @ApiBody({
    type: UpdateResourceDto,
    description: '资源更新信息'
  })
  @ApiResponse({
    status: 200,
    description: '资源更新成功',
    schema: {
      example: {
        success: true,
        code: 200,
        message: '资源更新成功',
        data: {
          id: 1,
          resource: 'user:read',
          namespace: 'default',
          description: '读取用户信息的完整权限',
          type: 'api'
        },
        timestamp: '2024-01-01T00:00:00.000Z'
      }
    }
  })
  @ApiResponse({
    status: 404,
    description: '资源不存在'
  })
  @ApiResponse({
    status: 400,
    description: '请求参数错误'
  })
  @ApiResponse({
    status: 401,
    description: '未授权访问'
  })
  async update(@Param('id') id: string, @Body() updateResourceDto: UpdateResourceDto, @Res() res: Response) {
    const resource = await this.resourceService.update(+id, updateResourceDto);
    return ResponseUtil.success(res, resource, '资源更新成功');
  }

  @Delete(':id')
  @ApiOperation({
    summary: '删除资源',
    description: '根据资源ID删除资源（软删除）'
  })
  @ApiParam({
    name: 'id',
    description: '资源ID',
    example: 1,
    type: 'number'
  })
  @ApiResponse({
    status: 200,
    description: '资源删除成功',
    schema: {
      example: {
        success: true,
        code: 200,
        message: '资源删除成功',
        data: null,
        timestamp: '2024-01-01T00:00:00.000Z'
      }
    }
  })
  @ApiResponse({
    status: 404,
    description: '资源不存在'
  })
  @ApiResponse({
    status: 401,
    description: '未授权访问'
  })
  async remove(@Param('id') id: string, @Res() res: Response) {
    await this.resourceService.remove(+id);
    return ResponseUtil.success(res, null, '资源删除成功');
  }
}
