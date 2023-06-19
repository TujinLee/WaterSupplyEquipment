import { interfaces } from '@/common/interfaces';
import request from '@/utils/request';

// 查询成员
export async function queryAdminList(userInfo) {
  return request(`${interfaces.queryAdminList}?adminId=${userInfo.id}&role=${userInfo.role}&department=${userInfo.department}&account=${userInfo.account}`);
}

export async function addOrUdateUserInfo(params) {
  return request(`${interfaces.addOrUdateUserInfo}`, {
    method: 'POST',
    data: params,
  });
}