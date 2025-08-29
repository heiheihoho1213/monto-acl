import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Res } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth, ApiResponse, ApiParam, ApiBody } from '@nestjs/swagger';
import { Response } from 'express';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RoleService } from './role.service';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { ResponseUtil } from '../common/utils/response.util';

@ApiTags('角色管理')
@ApiBearerAuth('JWT-auth')
@UseGuards(JwtAuthGuard)
@Controller('role')
export class RoleController {
  constructor(private readonly roleService: RoleService) { }

  @Post()
  @ApiOperation({
    summary: '创建角色',
    description: '创建一个新角色，需要提供角色名称和项目名称'
  })
  @ApiBody({
    type: CreateRoleDto,
    description: '角色创建信息'
  })
  @ApiResponse({
    status: 201,
    description: '角色创建成功',
    schema: {
      example: {
        success: true,
        code: 201,
        message: '角色创建成功',
        data: {
          id: 1,
          role: 'admin',
          namespace: 'default',
          description: '系统管理员角色',
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
  async create(@Body() createRoleDto: CreateRoleDto, @Res() res: Response) {
    const role = await this.roleService.create(createRoleDto);
    return ResponseUtil.created(res, role, '角色创建成功');
  }

  @Get()
  @ApiOperation({
    summary: '获取角色列表',
    description: '获取所有角色的列表信息'
  })
  @ApiResponse({
    status: 200,
    description: '获取角色列表成功',
    schema: {
      example: {
        success: true,
        code: 200,
        message: '获取角色列表成功',
        data: [
          {
            id: 1,
            role: 'admin',
            namespace: 'default',
            description: '系统管理员角色'
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
    const roles = await this.roleService.findAll();
    return ResponseUtil.success(res, roles, '获取角色列表成功');
  }

  @Get(':id')
  @ApiOperation({
    summary: '根据ID获取角色',
    description: '根据角色ID获取角色的详细信息'
  })
  @ApiParam({
    name: 'id',
    description: '角色ID',
    example: 1,
    type: 'number'
  })
  @ApiResponse({
    status: 200,
    description: '获取角色信息成功',
    schema: {
      example: {
        success: true,
        code: 200,
        message: '获取角色信息成功',
        data: {
          id: 1,
          role: 'admin',
          namespace: 'default',
          description: '系统管理员角色'
        },
        timestamp: '2024-01-01T00:00:00.000Z'
      }
    }
  })
  @ApiResponse({
    status: 404,
    description: '角色不存在'
  })
  @ApiResponse({
    status: 401,
    description: '未授权访问'
  })
  async findOne(@Param('id') id: string, @Res() res: Response) {
    const role = await this.roleService.findOne(+id);
    return ResponseUtil.success(res, role, '获取角色信息成功');
  }

  @Patch(':id')
  @ApiOperation({
    summary: '更新角色',
    description: '根据角色ID更新角色信息'
  })
  @ApiParam({
    name: 'id',
    description: '角色ID',
    example: 1,
    type: 'number'
  })
  @ApiBody({
    type: UpdateRoleDto,
    description: '角色更新信息'
  })
  @ApiResponse({
    status: 200,
    description: '角色更新成功',
    schema: {
      example: {
        success: true,
        code: 200,
        message: '角色更新成功',
        data: {
          id: 1,
          role: 'admin',
          namespace: 'default',
          description: '高级系统管理员角色'
        },
        timestamp: '2024-01-01T00:00:00.000Z'
      }
    }
  })
  @ApiResponse({
    status: 404,
    description: '角色不存在'
  })
  @ApiResponse({
    status: 400,
    description: '请求参数错误'
  })
  @ApiResponse({
    status: 401,
    description: '未授权访问'
  })
  async update(@Param('id') id: string, @Body() updateRoleDto: UpdateRoleDto, @Res() res: Response) {
    const role = await this.roleService.update(+id, updateRoleDto);
    return ResponseUtil.success(res, role, '角色更新成功');
  }

  @Delete(':id')
  @ApiOperation({
    summary: '删除角色',
    description: '根据角色ID删除角色（软删除）'
  })
  @ApiParam({
    name: 'id',
    description: '角色ID',
    example: 1,
    type: 'number'
  })
  @ApiResponse({
    status: 200,
    description: '角色删除成功',
    schema: {
      example: {
        success: true,
        code: 200,
        message: '角色删除成功',
        data: null,
        timestamp: '2024-01-01T00:00:00.000Z'
      }
    }
  })
  @ApiResponse({
    status: 404,
    description: '角色不存在'
  })
  @ApiResponse({
    status: 401,
    description: '未授权访问'
  })
  async remove(@Param('id') id: string, @Res() res: Response) {
    await this.roleService.remove(+id);
    return ResponseUtil.success(res, null, '角色删除成功');
  }
}
