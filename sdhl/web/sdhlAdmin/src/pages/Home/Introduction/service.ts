import { interfaces } from '@/common/interfaces';
import request from '@/utils/request';

// 查询
export async function queryProductionDocumentList() {
  return request(`${interfaces.queryProductionDocumentList}`);
}

export async function addOrUdateProductionInfo(params) {
  return request(`${interfaces.addOrUpdateProductionDocument}`, {
    method: 'POST',
    data: params,
  });
}