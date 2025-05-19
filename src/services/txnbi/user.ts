// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** 用户自身详情接口 用户自身详情接口 GET /user/auth/currentUserDetail */
export async function getUserAuthCurrentUserDetail(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getUserAuthCurrentUserDetailParams,
  options?: { [key: string]: any },
) {
  return request<API.CurrentUserDetailResp>('/user/auth/currentUserDetail', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 用户退出登陆接口 用户自身详情接口 POST /user/auth/loginOut */
export async function postUserAuthLoginOut(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.postUserAuthLoginOutParams,
  options?: { [key: string]: any },
) {
  return request<API.UserLoginOutResp>('/user/auth/loginOut', {
    method: 'POST',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 用户登陆接口 登陆界面中的用户登陆接口 POST /user/login */
export async function postUserLogin(body: API.UserLoginReq, options?: { [key: string]: any }) {
  return request<API.UserLoginResp>('/user/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 用户注册接口 登陆界面中的用户注册接口 POST /user/register */
export async function postUserRegister(
  body: API.UserRegisterReq,
  options?: { [key: string]: any },
) {
  return request<API.UserRegisterResp>('/user/register', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}
