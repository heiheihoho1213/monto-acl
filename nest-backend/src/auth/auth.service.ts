import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as md5 from 'md5';

import { UserService } from '../user/user.service';
import { LoginDto } from './dto/login.dto';
import { UnauthorizedException } from '../common/exceptions/custom.exception';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) { }

  async validateUser(user: string, password: string, namespace: string): Promise<any> {
    const userData = await this.userService.findByUsername(user, namespace);
    if (userData && userData.password === md5(password)) {
      const { password, ...result } = userData;
      return result;
    }
    return null;
  }

  async login(loginDto: LoginDto) {
    const { user, password, namespace } = loginDto;
    const userData = await this.validateUser(user, password, namespace);

    if (!userData) {
      throw new UnauthorizedException('用户名或密码错误');
    }

    const payload = { id: userData.id, user: userData.user, namespace: userData.namespace };
    const jwtToken = this.jwtService.sign(payload);

    return {
      jwt_token: jwtToken,
      user: userData.user,
    };
  }
}
