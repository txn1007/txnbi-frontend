// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** 用户获取自己的图表数据接口 用户获取自己的图表数据接口 GET /chart/auth/findMyChart */
export async function getChartAuthFindMyChart(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getChartAuthFindMyChartParams,
  options?: { [key: string]: any },
) {
  return request<API.FindMyChartResp>('/chart/auth/findMyChart', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** AI生成图表数据接口 AI生成图表数据接口 POST /chart/auth/gen */
export async function postChartAuthGen(
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

  return request<API.GenChartResp>('/chart/auth/gen', {
    method: 'POST',
    data: formData,
    requestType: 'form',
    ...(options || {}),
  });
}

/** 删除图表数据接口 删除图表数据接口 POST /chart/auth/myChartDel */
export async function postChartAuthMyChartDel(
  body: {
    /** 用户token */
    token: string;
    /** userID */
    userID: string;
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

  return request<API.DeleteMyChartResp>('/chart/auth/myChartDel', {
    method: 'POST',
    data: formData,
    requestType: 'form',
    ...(options || {}),
  });
}

/** 用户生成分享自己的图表邀请码接口 用户生成分享自己的图表邀请码接口 POST /chart/auth/share */
export async function postChartAuthShare(
  body: {
    /** 用户token */
    token: string;
    /** 图表ID */
    chartID: string;
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

  return request<API.ShareChartResp>('/chart/auth/share', {
    method: 'POST',
    data: formData,
    requestType: 'form',
    ...(options || {}),
  });
}

/** 用户修改自己的图表数据接口 用户修改自己的图表数据接口 POST /chart/auth/update */
export async function postChartAuthUpdate(
  body: {
    /** 用户token */
    token: string;
    /** 图表ID */
    chartID: string;
    /** 图表名 */
    chartName: string;
    /** 分析目标 */
    chartGoal: string;
    /** 分析结果 */
    genResult: string;
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

  return request<API.UpdateChartResp>('/chart/auth/update', {
    method: 'POST',
    data: formData,
    requestType: 'form',
    ...(options || {}),
  });
}

/** 用户获取自己的图表数据接口 用户获取自己的图表数据接口 GET /chart/exampleChart */
export async function getChartExampleChart(options?: { [key: string]: any }) {
  return request<API.ExampleChartResp>('/chart/exampleChart', {
    method: 'GET',
    ...(options || {}),
  });
}
