import { AvatarDropdown, AvatarName, Footer } from '@/components';
import { getUserAuthCurrentUserDetail } from '@/services/txnbi/user';
import { SettingDrawer } from '@ant-design/pro-components';

import type { RunTimeLayoutConfig } from '@umijs/max';
import { history } from '@umijs/max';
import { message } from 'antd';
import { errorConfig } from './requestErrorConfig';
const isDev = process.env.NODE_ENV === 'development';
const loginPath = '/user/login';
const examplePath = '/ExampleChart';

/**
 * @see  https://umijs.org/zh-CN/plugins/plugin-initial-state
 * */
export async function getInitialState(): Promise<{
  currentUser?: API.UserInfoV0;
  token?: string;
}> {
  const fetchUserInfo = async () => {
    try {
      const token = localStorage.getItem('token');
      if (token === null) {
        return;
      }
      return await getUserAuthCurrentUserDetail({ token: token });
    } catch (error) {
      localStorage.removeItem('token');
      history.push(loginPath);
    }
    return undefined;
  };

  // 如果不是登录或展示页页面，执行
  const { location } = history;
  if (
    location.pathname === examplePath &&
    (localStorage.getItem('token') === null || localStorage.getItem('token') === '')
  ) {
    const visitor: API.UserInfoV0 = {
      id: 0,
      userName: '游客',
      userRole: 'visitor',
      userAvatar: 'https://tiktokk-1331222828.cos.ap-guangzhou.myqcloud.com/avatar/avatar-tem.jpg',
    };
    return { currentUser: visitor, token: '' };
  }
  if (location.pathname !== loginPath) {
    const data = await fetchUserInfo();
    // 获取可能存在的 inviteCode
    const queryParams = new URLSearchParams(location.search);
    const inviteCode = queryParams.get('inviteCode');
    localStorage.setItem('inviteCode', inviteCode || '');
    return {
      currentUser: data.userInfoV0,
      token: localStorage.getItem('token'),
    };
  }
  return {};
}

// ProLayout 支持的api https://procomponents.ant.design/components/layout
export const layout: RunTimeLayoutConfig = ({ initialState, setInitialState }) => {
  return {
    logo: 'https://tiktokk-1331222828.cos.ap-guangzhou.myqcloud.com/txnbi-logo.svg',
    // actionsRender: () => [<Question key="doc" />],
    avatarProps: {
      src: initialState?.currentUser?.userAvatar,
      title: <AvatarName />,
      render: (_, avatarChildren) => {
        return <AvatarDropdown>{avatarChildren}</AvatarDropdown>;
      },
    },
    waterMarkProps: {
      content: initialState?.currentUser?.userName,
    },
    footerRender: () => <Footer />,
    onPageChange: () => {
      const { location } = history;
      // 如果没有登录，或身份是游客，则重定向到 login
      if (
        (!initialState?.currentUser || initialState?.currentUser?.userRole === 'visitor') &&
        !(location.pathname === loginPath || location.pathname === examplePath)
      ) {
        message.warning('您访问的资源需要登陆，请登录！');
        history.push(loginPath);
      }
    },
    bgLayoutImgList: [
      {
        src: 'https://mdn.alipayobjects.com/yuyan_qk0oxh/afts/img/D2LWSqNny4sAAAAAAAAAAAAAFl94AQBr',
        left: 85,
        bottom: 100,
        height: '303px',
      },
      {
        src: 'https://mdn.alipayobjects.com/yuyan_qk0oxh/afts/img/C2TWRpJpiC0AAAAAAAAAAAAAFl94AQBr',
        bottom: -68,
        right: -45,
        height: '303px',
      },
      {
        src: 'https://mdn.alipayobjects.com/yuyan_qk0oxh/afts/img/F6vSTbj8KpYAAAAAAAAAAAAAFl94AQBr',
        bottom: 0,
        left: 0,
        width: '331px',
      },
    ],
    menuHeaderRender: undefined,
    // 自定义 403 页面
    // unAccessible: <div>unAccessible</div>,
    // 增加一个 loading 的状态
    childrenRender: (children) => {
      // if (initialState?.loading) return <PageLoading />;
      return (
        <>
          {children}
          {isDev && (
            <SettingDrawer
              disableUrlParams
              enableDarkTheme
              onSettingChange={(settings) => {
                setInitialState((preInitialState) => ({
                  ...preInitialState,
                  settings,
                }));
              }}
            />
          )}
        </>
      );
    },
  };
};

/**
 * @name request 配置，可以配置错误处理
 * 它基于 axios 和 ahooks 的 useRequest 提供了一套统一的网络请求和错误处理方案。
 * @doc https://umijs.org/docs/max/request#配置
 */
export const request = {
  // baseURL: 'https://txn88.com',
  baseURL: 'http://localhost:8080',
  ...errorConfig,
};
