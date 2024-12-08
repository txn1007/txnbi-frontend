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
  file?: File,
  options?: { [key: string]: any },
) {
  const formData = new FormData();

  if (file) {
    formData.append('file', file);
  }

  Object.keys(body).forEach((ele) => {
    const item = (body as any)[ele];

    if (item !== undefined && item !== null) {
      if (typeof item === 'object' && !(item instanceof File)) {
        if (item instanceof Array) {
          item.forEach((f) => formData.append(ele, f || ''));
        } else {
          formData.append(ele, JSON.stringify(item));
        }
      } else {
        formData.append(ele, item);
      }
    }
  });

  return request<API.GenChartResp>('/chart/gen', {
    method: 'POST',
    data: formData,
    requestType: 'form',
    ...(options || {}),
  });
}
