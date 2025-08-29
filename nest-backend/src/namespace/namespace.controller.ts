import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Res } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth, ApiResponse, ApiParam, ApiBody } from '@nestjs/swagger';
import { Response } from 'express';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { NamespaceService } from './namespace.service';
import { CreateNamespaceDto } from './dto/create-namespace.dto';
import { UpdateNamespaceDto } from './dto/update-namespace.dto';
import { ResponseUtil } from '../common/utils/response.util';

@ApiTags('命名空间')
@ApiBearerAuth('JWT-auth')
@UseGuards(JwtAuthGuard)
@Controller('namespace')
export class NamespaceController {
  constructor(private readonly namespaceService: NamespaceService) { }

  @Post()
  @ApiOperation({
    summary: '创建命名空间',
    description: '创建一个新的项目命名空间'
  })
  @ApiBody({
    type: CreateNamespaceDto,
    description: '命名空间创建信息'
  })
  @ApiResponse({
    status: 201,
    description: '命名空间创建成功',
    schema: {
      example: {
        success: true,
        code: 201,
        message: '命名空间创建成功',
        data: {
          id: 1,
          namespace: 'default',
          description: '默认项目命名空间',
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
  @ApiResponse({
    status: 409,
    description: '命名空间已存在'
  })
  async create(@Body() createNamespaceDto: CreateNamespaceDto, @Res() res: Response) {
    const namespace = await this.namespaceService.create(createNamespaceDto);
    return ResponseUtil.created(res, namespace, '命名空间创建成功');
  }

  @Get()
  @ApiOperation({
    summary: '获取命名空间列表',
    description: '获取所有命名空间的列表信息'
  })
  @ApiResponse({
    status: 200,
    description: '获取命名空间列表成功',
    schema: {
      example: {
        success: true,
        code: 200,
        message: '获取命名空间列表成功',
        data: [
          {
            id: 1,
            namespace: 'default',
            description: '默认项目命名空间'
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
    const namespaces = await this.namespaceService.findAll();
    return ResponseUtil.success(res, namespaces, '获取命名空间列表成功');
  }

  @Get(':id')
  @ApiOperation({
    summary: '根据ID获取命名空间',
    description: '根据命名空间ID获取命名空间的详细信息'
  })
  @ApiParam({
    name: 'id',
    description: '命名空间ID',
    example: 1,
    type: 'number'
  })
  @ApiResponse({
    status: 200,
    description: '获取命名空间信息成功',
    schema: {
      example: {
        success: true,
        code: 200,
        message: '获取命名空间信息成功',
        data: {
          id: 1,
          namespace: 'default',
          description: '默认项目命名空间'
        },
        timestamp: '2024-01-01T00:00:00.000Z'
      }
    }
  })
  @ApiResponse({
    status: 404,
    description: '命名空间不存在'
  })
  @ApiResponse({
    status: 401,
    description: '未授权访问'
  })
  async findOne(@Param('id') id: string, @Res() res: Response) {
    const namespace = await this.namespaceService.findOne(+id);
    return ResponseUtil.success(res, namespace, '获取命名空间信息成功');
  }

  @Patch(':id')
  @ApiOperation({
    summary: '更新命名空间',
    description: '根据命名空间ID更新命名空间信息'
  })
  @ApiParam({
    name: 'id',
    description: '命名空间ID',
    example: 1,
    type: 'number'
  })
  @ApiBody({
    type: UpdateNamespaceDto,
    description: '命名空间更新信息'
  })
  @ApiResponse({
    status: 200,
    description: '命名空间更新成功',
    schema: {
      example: {
        success: true,
        code: 200,
        message: '命名空间更新成功',
        data: {
          id: 1,
          namespace: 'default',
          description: '更新后的项目命名空间描述'
        },
        timestamp: '2024-01-01T00:00:00.000Z'
      }
    }
  })
  @ApiResponse({
    status: 404,
    description: '命名空间不存在'
  })
  @ApiResponse({
    status: 400,
    description: '请求参数错误'
  })
  @ApiResponse({
    status: 401,
    description: '未授权访问'
  })
  async update(@Param('id') id: string, @Body() updateNamespaceDto: UpdateNamespaceDto, @Res() res: Response) {
    const namespace = await this.namespaceService.update(+id, updateNamespaceDto);
    return ResponseUtil.success(res, namespace, '命名空间更新成功');
  }

  @Delete(':id')
  @ApiOperation({
    summary: '删除命名空间',
    description: '根据命名空间ID删除命名空间（软删除）'
  })
  @ApiParam({
    name: 'id',
    description: '命名空间ID',
    example: 1,
    type: 'number'
  })
  @ApiResponse({
    status: 200,
    description: '命名空间删除成功',
    schema: {
      example: {
        success: true,
        code: 200,
        message: '命名空间删除成功',
        data: null,
        timestamp: '2024-01-01T00:00:00.000Z'
      }
    }
  })
  @ApiResponse({
    status: 404,
    description: '命名空间不存在'
  })
  @ApiResponse({
    status: 401,
    description: '未授权访问'
  })
  async remove(@Param('id') id: string, @Res() res: Response) {
    await this.namespaceService.remove(+id);
    return ResponseUtil.success(res, null, '命名空间删除成功');
  }
}
