import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Res,
  HttpStatus,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiBearerAuth,
  ApiResponse,
  ApiParam,
  ApiBody,
} from '@nestjs/swagger';
import { Response } from 'express';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ResponseUtil } from '../common/utils/response.util';

@ApiTags('用户管理')
@ApiBearerAuth('JWT-auth')
@UseGuards(JwtAuthGuard)
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) { }

  @Post()
  @ApiOperation({
    summary: '创建用户',
    description: '创建一个新用户，需要提供用户名、密码、项目名称等基本信息',
  })
  @ApiBody({
    type: CreateUserDto,
    description: '用户创建信息',
  })
  @ApiResponse({
    status: 201,
    description: '用户创建成功',
    schema: {
      example: {
        success: true,
        code: 201,
        message: '用户创建成功',
        data: {
          id: 1,
          user: 'john.doe',
          name: '张三',
          namespace: 'default',
          job: '软件工程师',
          email: 'john.doe@example.com',
          createTime: 1704067200,
          updateTime: 1704067200,
        },
        timestamp: '2024-01-01T00:00:00.000Z',
      },
    },
  })
  @ApiResponse({
    status: 400,
    description: '请求参数错误',
  })
  @ApiResponse({
    status: 401,
    description: '未授权访问',
  })
  async create(@Body() createUserDto: CreateUserDto, @Res() res: Response) {
    const user = await this.userService.create(createUserDto);
    return ResponseUtil.created(res, user, '用户创建成功');
  }

  @Get()
  @ApiOperation({
    summary: '获取用户列表',
    description: '获取所有用户的列表信息',
  })
  @ApiResponse({
    status: 200,
    description: '获取用户列表成功',
    schema: {
      example: {
        success: true,
        code: 200,
        message: '获取用户列表成功',
        data: [
          {
            id: 1,
            user: 'john.doe',
            name: '张三',
            namespace: 'default',
            job: '软件工程师',
            email: 'john.doe@example.com',
          },
        ],
        timestamp: '2024-01-01T00:00:00.000Z',
      },
    },
  })
  @ApiResponse({
    status: 401,
    description: '未授权访问',
  })
  async findAll(@Res() res: Response) {
    const users = await this.userService.findAll();
    return ResponseUtil.success(res, users, '获取用户列表成功');
  }

  @Get(':id')
  @ApiOperation({
    summary: '根据ID获取用户',
    description: '根据用户ID获取用户的详细信息',
  })
  @ApiParam({
    name: 'id',
    description: '用户ID',
    example: 1,
    type: 'number',
  })
  @ApiResponse({
    status: 200,
    description: '获取用户信息成功',
    schema: {
      example: {
        success: true,
        code: 200,
        message: '获取用户信息成功',
        data: {
          id: 1,
          user: 'john.doe',
          name: '张三',
          namespace: 'default',
          job: '软件工程师',
          email: 'john.doe@example.com',
        },
        timestamp: '2024-01-01T00:00:00.000Z',
      },
    },
  })
  @ApiResponse({
    status: 404,
    description: '用户不存在',
  })
  @ApiResponse({
    status: 401,
    description: '未授权访问',
  })
  async findOne(@Param('id') id: string, @Res() res: Response) {
    const user = await this.userService.findOne(+id);
    return ResponseUtil.success(res, user, '获取用户信息成功');
  }

  @Patch(':id')
  @ApiOperation({
    summary: '更新用户',
    description: '根据用户ID更新用户信息',
  })
  @ApiParam({
    name: 'id',
    description: '用户ID',
    example: 1,
    type: 'number',
  })
  @ApiBody({
    type: UpdateUserDto,
    description: '用户更新信息',
  })
  @ApiResponse({
    status: 200,
    description: '用户更新成功',
    schema: {
      example: {
        success: true,
        code: 200,
        message: '用户更新成功',
        data: {
          id: 1,
          user: 'john.doe',
          name: '张三',
          namespace: 'default',
          job: '高级软件工程师',
          email: 'john.doe@example.com',
        },
        timestamp: '2024-01-01T00:00:00.000Z',
      },
    },
  })
  @ApiResponse({
    status: 404,
    description: '用户不存在',
  })
  @ApiResponse({
    status: 400,
    description: '请求参数错误',
  })
  @ApiResponse({
    status: 401,
    description: '未授权访问',
  })
  async update(
    @Param('id') id: string,
    @Body() updateUserDto: UpdateUserDto,
    @Res() res: Response,
  ) {
    const user = await this.userService.update(+id, updateUserDto);
    return ResponseUtil.success(res, user, '用户更新成功');
  }

  @Delete(':id')
  @ApiOperation({
    summary: '删除用户',
    description: '根据用户ID删除用户（软删除）',
  })
  @ApiParam({
    name: 'id',
    description: '用户ID',
    example: 1,
    type: 'number',
  })
  @ApiResponse({
    status: 200,
    description: '用户删除成功',
    schema: {
      example: {
        success: true,
        code: 200,
        message: '用户删除成功',
        data: null,
        timestamp: '2024-01-01T00:00:00.000Z',
      },
    },
  })
  @ApiResponse({
    status: 404,
    description: '用户不存在',
  })
  @ApiResponse({
    status: 401,
    description: '未授权访问',
  })
  async remove(@Param('id') id: string, @Res() res: Response) {
    await this.userService.remove(+id);
    return ResponseUtil.success(res, null, '用户删除成功');
  }
}
