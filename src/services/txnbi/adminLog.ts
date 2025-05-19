// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** 管理员批量删除日志 管理员批量删除日志 POST /admin/log/batchDelete */
export async function postAdminLogBatchDelete(
  body: API.AdminBatchDeleteLogReq,
  options?: { [key: string]: any },
) {
  return request<API.AdminBatchDeleteLogResp>('/admin/log/batchDelete', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 管理员创建日志 管理员创建日志 POST /admin/log/create */
export async function postAdminLogCreate(
  body: API.AdminCreateLogReq,
  options?: { [key: string]: any },
) {
  return request<API.AdminCreateLogResp>('/admin/log/create', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 管理员删除日志 管理员删除日志 POST /admin/log/delete */
export async function postAdminLogOpenApiDelete(
  body: API.AdminDeleteLogReq,
  options?: { [key: string]: any },
) {
  return request<API.AdminDeleteLogResp>('/admin/log/delete', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 管理员获取日志详情 管理员获取日志详情 GET /admin/log/detail */
export async function getAdminLogDetail(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getAdminLogDetailParams,
  options?: { [key: string]: any },
) {
  return request<API.AdminLogDetailResp>('/admin/log/detail', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 管理员获取日志列表 管理员获取日志列表 GET /admin/log/list */
export async function getAdminLogList(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getAdminLogListParams & { token: string },
  options?: { [key: string]: any },
) {
  return request<API.AdminLogListResp>('/admin/log/list', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 管理员更新日志 管理员更新日志 POST /admin/log/update */
export async function postAdminLogUpdate(
  body: API.AdminUpdateLogReq,
  options?: { [key: string]: any },
) {
  return request<API.AdminUpdateLogResp>('/admin/log/update', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}
