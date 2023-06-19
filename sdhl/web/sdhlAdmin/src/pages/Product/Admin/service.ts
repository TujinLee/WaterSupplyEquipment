import { interfaces } from '@/common/interfaces';
import request from '@/utils/request';

// 查询产品列表
export async function queryProductionList(queryType) {
  return request(`${interfaces.queryProductionList}?queryType=${queryType}`);
}

// 新增或更新
export async function addOrUdateProductionInfo(params) {
  return request(`${interfaces.addOrUdateProductionInfo}`, {
    method: 'POST',
    data: params,
  });
}

// 复制产品
export async function copyProductionInfo(params) {
  return request(`${interfaces.copyProductionInfo}`, {
    method: 'POST',
    data: params,
  });
}

// 查询产品
export async function queryProductionInfo(queryType, productionId) {
  return request(`${interfaces.queryProductionInfo}?queryType=${queryType}&productionId=${productionId}`);
}