import { interfaces } from '@/common/interfaces';
import request from '@/utils/request';

// 查询
export async function queryRecentNews(queryType: number, queryCount: number) {
  return request(`${interfaces.queryRecentNews}?queryType=${queryType}&queryCount=${queryCount}`);
}

// 查询详情
export async function queryInformationDetail(id: number) {
  return request(`${interfaces.queryInformationDetail}?informationId=${id}`);
}

// 更新阅读量
export async function updateReadingCount(id: number) {
  // return request(`${interfaces.updateReadingCount}?informationId=${id}`);
  return request(`${interfaces.updateReadingCount}`, {
    method: 'POST',
    data: {
      informationId:id
    },
  });
}

// 查询
export async function queryInformationListForFront(pageInfo: any, columnists:number) {
  return request(`${interfaces.queryInformationListForFront}?pageIndex=${pageInfo.pageIndex}&pageSize=${pageInfo.pageSize}&queryType=1&columnists=${columnists}`);
}