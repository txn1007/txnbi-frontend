// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** 管理员创建用户 管理员创建用户 POST /admin/user/create */
export async function postAdminUserCreate(
  body: API.AdminCreateUserReq & { token: string },
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

  return request<API.AdminCreateUserResp>('/admin/user/create', {
    method: 'POST',
    data: formData,
    requestType: 'form',
    ...(options || {}),
  });
}

/** 管理员删除用户 管理员删除用户 POST /admin/user/delete */
export async function postAdminUserOpenApiDelete(
  body: API.AdminDeleteUserReq & { token: string },
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

  return request<API.AdminDeleteUserResp>('/admin/user/delete', {
    method: 'POST',
    data: formData,
    requestType: 'form',
    ...(options || {}),
  });
}

/** 管理员获取用户详情 管理员获取用户详情 GET /admin/user/detail */
export async function getAdminUserDetail(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getAdminUserDetailParams,
  options?: { [key: string]: any },
) {
  return request<API.AdminUserDetailResp>('/admin/user/detail', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 管理员禁用/启用用户 管理员禁用/启用用户 POST /admin/user/disable */
export async function postAdminUserDisable(
  body: API.AdminDisableUserReq,
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

  return request<API.AdminDisableUserResp>('/admin/user/disable', {
    method: 'POST',
    data: formData,
    requestType: 'form',
    ...(options || {}),
  });
}

/** 管理员获取用户列表 管理员获取用户列表 GET /admin/user/list */
export async function getAdminUserList(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getAdminUserListParams & { token: string },
  options?: { [key: string]: any },
) {
  return request<API.AdminUserListResp>('/admin/user/list', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 管理员更新用户 管理员更新用户 POST /admin/user/update */
export async function postAdminUserUpdate(
  body: API.AdminUpdateUserReq,
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

  return request<API.AdminUpdateUserResp>('/admin/user/update', {
    method: 'POST',
    data: formData,
    requestType: 'form',
    ...(options || {}),
  });
}
