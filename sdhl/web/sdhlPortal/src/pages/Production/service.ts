import { interfaces } from '@/common/interfaces';
import request from '@/utils/request';

// 查询产品列表
export async function queryProductionList(queryType) {
  return request(`${interfaces.queryProductionList}?queryType=${queryType}`);
}

// 查询产品
export async function queryProductionInfo(queryType, productionId) {
  return request(`${interfaces.queryProductionInfo}?queryType=${queryType}&productionId=${productionId}`);
}