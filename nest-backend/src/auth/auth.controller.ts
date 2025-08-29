import { Controller, Post, Body, UseGuards, Get, Request, Res } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth, ApiResponse, ApiBody, ApiHeader } from '@nestjs/swagger';
import { Response } from 'express';
import { JwtAuthGuard } from './jwt-auth.guard';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { ResponseUtil } from '../common/utils/response.util';

@ApiTags('认证')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) { }

  @Post('login')
  @ApiOperation({
    summary: '用户登录',
    description: '用户通过用户名、密码和项目名称进行登录认证'
  })
  @ApiBody({
    type: LoginDto,
    description: '用户登录信息'
  })
  @ApiResponse({
    status: 200,
    description: '登录成功',
    schema: {
      example: {
        success: true,
        code: 200,
        message: '登录成功',
        data: {
          jwt_token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',
          user: 'john.doe'
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
    description: '用户名或密码错误'
  })
  async login(@Body() loginDto: LoginDto, @Res() res: Response) {
    const result = await this.authService.login(loginDto);
    return ResponseUtil.success(res, result, '登录成功');
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  @ApiOperation({
    summary: '获取用户信息',
    description: '获取当前登录用户的详细信息'
  })
  @ApiBearerAuth('JWT-auth')
  @ApiHeader({
    name: 'Authorization',
    description: 'Bearer JWT token',
    required: true,
    example: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...'
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
          namespace: 'default'
        },
        timestamp: '2024-01-01T00:00:00.000Z'
      }
    }
  })
  @ApiResponse({
    status: 401,
    description: '未授权访问，需要有效的JWT token'
  })
  getProfile(@Request() req, @Res() res: Response) {
    return ResponseUtil.success(res, req.user, '获取用户信息成功');
  }
}
