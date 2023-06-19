import { interfaces } from '@/common/interfaces';
import request from '@/utils/request';

// 查询
export async function queryRecruitmentList() {
  return request(`${interfaces.queryRecruitmentList}?isFront=0`); //0表示后台查询
}

// 查询
export async function queryRecruitmentInfo(recruitmentId) {
  return request(`${interfaces.queryRecruitmentInfo}?recruitmentId=${recruitmentId}`);
}

export async function addOrUdateRecruitment(params) {
  return request(`${interfaces.addOrUdateRecruitment}`, {
    method: 'POST',
    data: params,
  });
}