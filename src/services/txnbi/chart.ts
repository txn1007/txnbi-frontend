// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** 用户获取自己的图表数据接口 用户获取自己的图表数据接口 GET /chart/findMyChart */
export async function getChartFindMyChart(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getChartFindMyChartParams,
  options?: { [key: string]: any },
) {
  return request<API.FindMyChartResp>('/chart/findMyChart', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** AI生成图表数据接口 AI生成图表数据接口 POST /chart/gen */
export async function postChartGen(
  body: {
    /** 用户token */
    token: string;
    /** 表名 */
    chartName: string;
    /** 表类型 */
    chartType: string;
    /** 查询目标 */
    goal: string;
  },
  options?: { [key: string]: any },
) {
  return request<API.GenChartResp>('/chart/gen', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    data: body,
    ...(options || {}),
  });
}
