import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Res } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth, ApiResponse, ApiParam, ApiBody } from '@nestjs/swagger';
import { Response } from 'express';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { PermissionService } from './permission.service';
import { CreateRolePermissionDto } from './dto/create-role-permission.dto';
import { UpdateRolePermissionDto } from './dto/update-role-permission.dto';
import { ResponseUtil } from '../common/utils/response.util';

@ApiTags('权限管理')
@ApiBearerAuth('JWT-auth')
@UseGuards(JwtAuthGuard)
@Controller('permission')
export class PermissionController {
  constructor(private readonly permissionService: PermissionService) { }

  @Post()
  @ApiOperation({
    summary: '创建角色权限',
    description: '为角色分配资源权限，建立角色与资源的关联关系'
  })
  @ApiBody({
    type: CreateRolePermissionDto,
    description: '角色权限创建信息'
  })
  @ApiResponse({
    status: 201,
    description: '角色权限创建成功',
    schema: {
      example: {
        success: true,
        code: 201,
        message: '角色权限创建成功',
        data: {
          id: 1,
          role: 'admin',
          resource: 'user:read',
          namespace: 'default',
          description: '管理员可以读取用户信息',
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
    description: '角色权限已存在'
  })
  async create(@Body() createRolePermissionDto: CreateRolePermissionDto, @Res() res: Response) {
    const rolePermission = await this.permissionService.create(createRolePermissionDto);
    return ResponseUtil.created(res, rolePermission, '角色权限创建成功');
  }

  @Get()
  @ApiOperation({
    summary: '获取权限列表',
    description: '获取所有角色权限的列表信息'
  })
  @ApiResponse({
    status: 200,
    description: '获取权限列表成功',
    schema: {
      example: {
        success: true,
        code: 200,
        message: '获取权限列表成功',
        data: [
          {
            id: 1,
            role: 'admin',
            resource: 'user:read',
            namespace: 'default',
            description: '管理员可以读取用户信息'
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
    const permissions = await this.permissionService.findAll();
    return ResponseUtil.success(res, permissions, '获取权限列表成功');
  }

  @Get(':id')
  @ApiOperation({
    summary: '根据ID获取权限',
    description: '根据权限ID获取权限的详细信息'
  })
  @ApiParam({
    name: 'id',
    description: '权限ID',
    example: 1,
    type: 'number'
  })
  @ApiResponse({
    status: 200,
    description: '获取权限信息成功',
    schema: {
      example: {
        success: true,
        code: 200,
        message: '获取权限信息成功',
        data: {
          id: 1,
          role: 'admin',
          resource: 'user:read',
          namespace: 'default',
          description: '管理员可以读取用户信息'
        },
        timestamp: '2024-01-01T00:00:00.000Z'
      }
    }
  })
  @ApiResponse({
    status: 404,
    description: '权限不存在'
  })
  @ApiResponse({
    status: 401,
    description: '未授权访问'
  })
  async findOne(@Param('id') id: string, @Res() res: Response) {
    const permission = await this.permissionService.findOne(+id);
    return ResponseUtil.success(res, permission, '获取权限信息成功');
  }

  @Patch(':id')
  @ApiOperation({
    summary: '更新权限',
    description: '根据权限ID更新权限信息'
  })
  @ApiParam({
    name: 'id',
    description: '权限ID',
    example: 1,
    type: 'number'
  })
  @ApiBody({
    type: UpdateRolePermissionDto,
    description: '权限更新信息'
  })
  @ApiResponse({
    status: 200,
    description: '权限更新成功',
    schema: {
      example: {
        success: true,
        code: 200,
        message: '权限更新成功',
        data: {
          id: 1,
          role: 'admin',
          resource: 'user:read',
          namespace: 'default',
          description: '管理员可以读取用户完整信息'
        },
        timestamp: '2024-01-01T00:00:00.000Z'
      }
    }
  })
  @ApiResponse({
    status: 404,
    description: '权限不存在'
  })
  @ApiResponse({
    status: 400,
    description: '请求参数错误'
  })
  @ApiResponse({
    status: 401,
    description: '未授权访问'
  })
  async update(@Param('id') id: string, @Body() updateRolePermissionDto: UpdateRolePermissionDto, @Res() res: Response) {
    const permission = await this.permissionService.update(+id, updateRolePermissionDto);
    return ResponseUtil.success(res, permission, '权限更新成功');
  }

  @Delete(':id')
  @ApiOperation({
    summary: '删除权限',
    description: '根据权限ID删除权限（软删除）'
  })
  @ApiParam({
    name: 'id',
    description: '权限ID',
    example: 1,
    type: 'number'
  })
  @ApiResponse({
    status: 200,
    description: '权限删除成功',
    schema: {
      example: {
        success: true,
        code: 200,
        message: '权限删除成功',
        data: null,
        timestamp: '2024-01-01T00:00:00.000Z'
      }
    }
  })
  @ApiResponse({
    status: 404,
    description: '权限不存在'
  })
  @ApiResponse({
    status: 401,
    description: '未授权访问'
  })
  async remove(@Param('id') id: string, @Res() res: Response) {
    await this.permissionService.remove(+id);
    return ResponseUtil.success(res, null, '权限删除成功');
  }
}
