import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return 'ACL权限管理系统 API 服务运行正常！';
  }
}
