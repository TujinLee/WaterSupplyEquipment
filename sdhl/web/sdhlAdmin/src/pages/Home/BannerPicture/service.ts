import { interfaces } from '@/common/interfaces';
import request from '@/utils/request';

// 查询
export async function queryHomeBannerList() {
  return request(`${interfaces.queryHomeBannerList}`);
}

export async function addOrUdateHomeBanner(params) {
  return request(`${interfaces.addOrUdateHomeBanner}`, {
    method: 'POST',
    data: params,
  });
}