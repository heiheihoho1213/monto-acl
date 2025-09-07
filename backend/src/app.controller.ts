import { Controller, Get, Res } from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { Response } from 'express';
import { AppService } from './app.service';
import { ResponseUtil } from './common/utils/response.util';

@ApiTags('应用')
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) { }

  @Get()
  @ApiOperation({ summary: '健康检查' })
  getHello(@Res() res: Response) {
    const message = this.appService.getHello();
    return ResponseUtil.success(res, { message }, '服务运行正常');
  }
}
