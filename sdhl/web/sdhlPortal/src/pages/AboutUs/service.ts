import { interfaces } from '@/common/interfaces';
import request from '@/utils/request';

// 查询
export async function queryRecruitmentList() {
  return request(`${interfaces.queryRecruitmentList}?isFront=1`); //0表示前台查询
}

// 查询
export async function queryRecruitmentInfo(recruitmentId: number) {
  return request(`${interfaces.queryRecruitmentInfo}?recruitmentId=${recruitmentId}`);
}