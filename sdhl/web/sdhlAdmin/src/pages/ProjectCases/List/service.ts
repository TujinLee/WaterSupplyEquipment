import { interfaces } from '@/common/interfaces';
import request from '@/utils/request';

// 查询项目
export async function queryProjectList(pageInfo) {
  return request(`${interfaces.queryProjectList}?pageIndex=${pageInfo.pageIndex}&pageSize=${pageInfo.pageSize}`);
}
// 添加/更新项目
export async function addOrUdateProjectInfo(params) {
  return request(`${interfaces.addOrUdateProjectInfo}`, {
    method: 'POST',
    data: params,
  });
}
// 复制项目
export async function copyProjectInfo(params) {
  return request(`${interfaces.copyProjectInfo}`, {
    method: 'POST',
    data: params,
  });
}