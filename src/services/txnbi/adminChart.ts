// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** 管理员删除图表接口 管理员删除图表接口 POST /admin/chart/delete */
export async function postAdminChartOpenApiDelete(
  body: {
    /** 图表ID */
    chartID: number;
  },
  options?: { [key: string]: any },
) {
  const formData = new FormData();

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

  return request<API.AdminDeleteChartResp>('/admin/chart/delete', {
    method: 'POST',
    data: formData,
    requestType: 'form',
    ...(options || {}),
  });
}

/** 管理员获取图表详情接口 管理员获取图表详情接口 GET /admin/chart/detail */
export async function getAdminChartDetail(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getAdminChartDetailParams,
  options?: { [key: string]: any },
) {
  return request<API.AdminChartDetailResp>('/admin/chart/detail', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 管理员获取图表列表接口 管理员获取图表列表接口 GET /admin/chart/list */
export async function getAdminChartList(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getAdminChartListParams & { token: string },
  options?: { [key: string]: any },
) {
  return request<API.AdminChartListResp>('/admin/chart/list', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 管理员更新图表接口 管理员更新图表接口 POST /admin/chart/update */
export async function postAdminChartUpdate(
  body: {
    /** 图表ID */
    chartID: number;
    /** 图表名称 */
    chartName?: string;
    /** 分析目标 */
    chartGoal?: string;
    /** 分析结果 */
    genResult?: string;
  },
  options?: { [key: string]: any },
) {
  const formData = new FormData();

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

  return request<API.AdminUpdateChartResp>('/admin/chart/update', {
    method: 'POST',
    data: formData,
    requestType: 'form',
    ...(options || {}),
  });
}
