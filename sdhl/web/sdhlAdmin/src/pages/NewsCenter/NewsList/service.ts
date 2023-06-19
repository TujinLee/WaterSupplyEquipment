import { interfaces } from '@/common/interfaces';
import request from '@/utils/request';

// 查询
export async function queryInformationList(pageInfo, queryType) {
  return request(`${interfaces.queryInformationList}?pageIndex=${pageInfo.pageIndex}&pageSize=${pageInfo.pageSize}&queryType=${queryType}`);
}

export async function addOrUdateInformation(params) {
  return request(`${interfaces.addOrUdateInformation}`, {
    method: 'POST',
    data: params,
  });
}

// 归档
export async function archiving(params) {
  return request(`${interfaces.archiving}`, {
    method: 'POST',
    data: params,
  });
}

// 取消推荐
export async function cancelRecommend(params) {
  return request(`${interfaces.cancelRecommend}`, {
    method: 'POST',
    data: params,
  });
}

// 推荐位置
export async function recommendposUpdate(params) {
  return request(`${interfaces.recommendposUpdate}`, {
    method: 'POST',
    data: params,
  });
}

// 已存在推荐位置
export async function queryExistRecommendpos(params) {
  return request(`${interfaces.queryExistRecommendpos}`);
}