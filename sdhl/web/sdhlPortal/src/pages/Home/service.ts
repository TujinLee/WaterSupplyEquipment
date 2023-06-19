import { interfaces } from '@/common/interfaces';
import request from '@/utils/request';

// 查询banner图
export async function queryHomeBannerList() {
  return request(`${interfaces.queryHomeBannerList}`);
}
// 查询产品介绍文案
export async function queryProductionDocumentList() {
  return request(`${interfaces.queryProductionDocumentList}`);
}