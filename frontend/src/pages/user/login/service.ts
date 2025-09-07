import request from '@/utils/request';
import { LoginParamsType } from './data';

const namespace = 'acl';

export async function accountLogin(params: LoginParamsType): Promise<any> {
  return request({
    url: '/auth/login',
    method: 'post',
    data: { ...params, namespace },
  });
}
