import { interfaces } from '@/common/interfaces';
import request from '@/utils/request';

// 查询项目
export async function queryProjectList(pageInfo: any) {
  return request(`${interfaces.queryProjectList}?pageIndex=${pageInfo.pageIndex}&pageSize=${pageInfo.pageSize}`);
}